<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use Illuminate\Http\Request;
use App\Http\Requests\Billings\StoreBillingRequest;
use App\Http\Requests\Billings\UpdateBillingRequest;
use App\Http\Requests\Packages\StorePackageRequest;
use App\Http\Requests\Payments\InitPaymentMethodAddRequest;
use App\Http\Requests\Payments\ProcessPaymentRequest;
use App\Http\Requests\Payments\StorePaymentMethodRequest;
use App\Models\AcademicYear;
use App\Models\Coupon;
use App\Models\Father;
use App\Models\File;
use App\Models\Package;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\School;
use App\Models\Student;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentsController extends Controller
{
    public function init(Student $student, Package $package, Request $request){
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }

        if($package->school_id != $student->school_id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }

        if($package->hidden == true){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        Payment::where([
            'student_id' => $student->id,
            'package_id' => $package->id,
            'status' => null
        ])->delete();
        
        $payment = Payment::create([
            'father_id' => $father->id,
            'student_id' => $student->id,
            'status' => null
        ]);

        $payment->saveFromPackageInfo($package);
        $payment->calculateTotal();
        $payment->generateRef();
        $payment->save();
        
        $student->load(
            'image:id,path,current_name'
        );

        return response()->json([
            'status' => 'success',
            'data' => [
                'package' => $package->makeHidden(['created_at', 'updated_at']),
                'student' => $student->makeHidden([
                    'otp', 'otp_expires_at', 'nfc_id', 
                    'face_id', 'currentSubscription', 'subscribed', 
                    'tookSnackToday', 'tookMainMealToday', 'class',
                    'created_at', 'updated_at'
                ]),
                'payment' => $payment,
                'customer_ip' => $request->ip(),
                'customer_email' => $user->email
            ]
        ]);
    }

    public function indexPaymentMethods(){
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        $paymentMethods = PaymentMethod::where('father_id', $father->id)->get();

        $response = [
            'status' => 'success',
            'data' => [
                'paymentMethods' => $paymentMethods->makeHidden(['token_name']),
            ]
        ];

        return response()->json($response);
    }

    public function storePaymentsMethod(Father $father, StorePaymentMethodRequest $request){
        $paymentMethod = PaymentMethod::where('token_name', $request->input('token_name'))->first();
        if($paymentMethod != null){
            return response()->json([
                'status' => 'error',
                'data' => [
                    'duplicate_card' => [
                        'Oops! This card is already stores on our system. Please use your existing card or try a different one.'
                    ]
                ]
            ]);
        }

        $paymentMethod = PaymentMethod::create(array_merge(
            $request->validated(),
            [
                'father_id' => $father->id 
            ]
        ));

        $paymentMethod->generateRef();

        $paymentMethod->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function initPaymentMethodAdd(InitPaymentMethodAddRequest $request){
        $return_url = $request->input('return_url');

        $ref = null;

        do {
            $ref = 'TOKENIZATION-'.strtoupper(Str::random(8));
        
            $paymentWithRef = PaymentMethod::where('ref', $ref)->first();
        } while ($paymentWithRef != null);

        return response()->json([
            'status' => 'success',
            'data' => [
                'payfort_url' => env('PAYFORT_IS_SANDBOX') ? env('PAYFORT_TEST_URL') : env('PAYFORT_PROD_URL'),
                'service_command' => 'TOKENIZATION',
                'language' => 'en',
                'access_code' => env('PAYFORT_ACCESS_CODE'),
                'merchant_identifier' => env('PAYFORT_MERCHANT_ID'),
                'merchant_reference' => $ref,             
                'signature' => $this->calculateSignature([
                    'service_command=TOKENIZATION',
                    'language=en',
                    'access_code='.env('PAYFORT_ACCESS_CODE'),
                    'merchant_identifier='.env('PAYFORT_MERCHANT_ID'),
                    'merchant_reference='.$ref,
                    'return_url='.$return_url,
                ])
            ]
        ]);
    }

    public function testPayment(){
        $request = new ProcessPaymentRequest([
            'payment_id' => '45',
            'customer_email' => 'test@test.com',
            'customer_ip' => '127.0.0.1',
            'payment_method_id' => '20',
            'billing_id' => '1',
        ]);

        // Call the processPayment method with the populated request.
        return $this->processPayment($request);
    }

    public function processPayment(ProcessPaymentRequest $request){
        $payment = Payment::findOrFail($request->input('payment_id'));

        if($request->has('coupon_id') && $request->input('coupon_id') != null){
            $coupon = Coupon::findOrFail($request->get('coupon_id'));
            $payment->applyCoupon($coupon);
        }

        if($payment->ref == null)
            $payment->generateRef();

        $payment->calculateTotal();
        $payment->updateBilling($request->input('billing_id'));
        $payment->updatePaymentMethod($request->input('payment_method_id'));
        $payment->save();

        $paymentMethod = PaymentMethod::findOrFail($request->input('payment_method_id'));

        $payfort_url = env('PAYFORT_IS_SANDBOX') ? env('PAYFORT_API_TEST_URL') : env('PAYFORT_API_PROD_URL');
        
        $payload = [
            'command' => 'PURCHASE',
            'language' => 'en',
            'access_code' => env('PAYFORT_ACCESS_CODE'),
            'merchant_identifier' => env('PAYFORT_MERCHANT_ID'),
            'merchant_reference' => $payment->ref,  
            'amount' => round($payment->total, 2) * 100,
            'currency' => 'SAR',
            'customer_email' => $request->input('customer_email'), 
            'customer_ip' => $request->input('customer_ip'), 
            'token_name' => $paymentMethod->token_name,
            'signature' => $this->calculateSignature([
                'command=PURCHASE',
                'language=en',
                'access_code='.env('PAYFORT_ACCESS_CODE'),
                'merchant_identifier='.env('PAYFORT_MERCHANT_ID'),
                'merchant_reference='.$payment->ref,
                'amount='.round($payment->total, 2) * 100,
                'currency=SAR',
                'customer_email='.$request->input('customer_email'),
                'customer_ip='.$request->input('customer_ip'),
                'token_name='.$paymentMethod->token_name
            ])
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json', 
        ])->post($payfort_url, $payload);

        $responseData = $response->json();

        if($responseData['response_code'] == '20064' && $responseData['3ds_url'] ){
            return response()->json([
                'status' => '3ds_url',
                'data' => [
                    '3ds_url' => $responseData['3ds_url'],
                    'merchant_reference' => $responseData['merchant_reference']
                ]
            ]);
        }

        if($responseData['status'] == 14){
            $payment->status = $responseData['status'];
            $payment->response_code = $responseData['response_code'];
            $payment->response_message = $responseData['response_message'];
            $payment->fort_id = $responseData['fort_id'];

            $payment->save();

            $payment->saveSubscriptionInfoAfterPayment();

            return response()->json([
                'status' => 'success',
                'data' => [
                    'merchant_reference' => $responseData['merchant_reference']
                ]
            ]);
        }else{
            return response()->json([
                'status' => 'error',
                'error' => $responseData['response_message']
            ]);
        }
    }

    public function checkPayment($ref){
        $payment = Payment::where('ref', $ref)->first();
        if($payment == null){
            return response()->json([
                'status' => 'error',
                'error' => [
                    'message' => 'Payment Not found on our server, please contact the administration',
                ]
            ]);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'payment' => $payment
            ]
        ]);
    }

    public function paymentReturn(Request $request){
        $responseData = $request->all();

        $payment = Payment::where('ref', $responseData['merchant_reference'])->first();

        if($payment == null){
            return response()->json([
                'status' => 'error',
                'error' => [
                    'message' => 'Payment Not found on our server, please contact the administration',
                    'data' => $responseData
                ]
            ]);
        }

        if($responseData['status'] == 14){
            $payment->saveSubscriptionInfoAfterPayment();
        }
        
        $payment->status = $responseData['status'];
        $payment->response_code = $responseData['response_code'];
        $payment->response_message = $responseData['response_message'];
        $payment->fort_id = $responseData['fort_id'];
        $payment->save();

        $script = "<script>window.close();</script>";
        return response($script)->header('Content-Type', 'text/html');
    }

    public function webhook(Request $request){
        $responseData = $request->all();

        $payment = Payment::where('ref', $responseData['merchant_reference'])->first();

        if($payment == null){
            return response()->json([
                'status' => 'error',
                'error' => [
                    'message' => 'Payment Not found on our server, please contact the administration',
                    'data' => $responseData
                ]
            ]);
        }

        if($responseData['status'] == 14){
            $payment->status = $responseData['status'];
            $payment->response_code = $responseData['response_code'];
            $payment->response_message = $responseData['response_message'];
            $payment->save();

            $payment->saveSubscriptionInfoAfterPayment();
        } 
    }

    private function calculateSignature(array $fieldArray){
        $fields = [];
    
        foreach($fieldArray as $val) {
            $fieldSplitted = explode("=", $val);
            $fields[$fieldSplitted[0]] = $fieldSplitted[1];
        }
    
        return $this->hash($fields, env('PAYFORT_SHA_REQUEST_PHRASE'));
    }

    private function hash($arrData, $prefix){
        $shaString = '';
        ksort($arrData);

        foreach ($arrData as $key => $val) {
            if(gettype($val) != 'array') {
                $shaString .= "$key=$val";
            } else {
                $sub_str = $key . '={';
                $index = 0;
                foreach ($val as $k => $v) {
                    $sub_str .= "$k=$v";
                    if ($index < count($val) - 1) {
                        $sub_str .= ', ';
                    }
                    $index++;
                }
                $sub_str .= '}';
                $shaString .= $sub_str;
            }
        }


        $shaString = $prefix . $shaString . $prefix;

        return hash("sha256", $shaString);
    }

    public function deletePaymentMethod(PaymentMethod $paymentMethod){
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        if($paymentMethod->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }


        $paymentMethod->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}