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
use App\Models\Subscription;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentsController extends Controller
{
    public function index(Request $request) 
    {
        $father = $request->get('father');

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $payments = Payment::orderBy('id', 'DESC')->where(['father_id' => $father->id, 'status' => 14])->with([
            'subscription:id,ref,package_id,student_id,started_at,expired_at,initiated_at,days',
            'subscription.package:id,name,code,sale_price,price,days,school_id',
            'subscription.package.school:id,name,file_id',
            'subscription.package.school.logo:id,path,current_name',
            'subscription.student:id,firstname,lastname,file_id',
            'subscription.student.image:id,path,current_name',
            'subscription.payment:id,subscription_id,status,payment_option,card_number,card_holder_name,firstname,lastname,email,phone,address,state,city,zipcode'
        ]);

        if ($search) {
            $payments->where(function ($query) use ($search) {
                $query->whereHas('subscription', function ($subscriptionQuery) use ($search) {
                        $subscriptionQuery->where('ref', 'like', '%' . $search . '%')
                            ->orWhereHas('package', function ($packageQuery) use ($search) {
                                $packageQuery->where('name', 'like', '%' . $search . '%')
                                    ->where('name_ar', 'like', '%' . $search . '%')
                                    ->orWhere('code', 'like', '%' . $search . '%');
                            })
                            ->orWhereHas('student', function ($studentQuery) use ($search) {
                                $studentQuery->where('firstname', 'like', '%' . $search . '%')
                                    ->orWhere('lastname', 'like', '%' . $search . '%');
                            });
                    });
            });
        }

        $payments = $payments->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'payments' => $payments->items(), 
            ],
            'pagination' => handlePagination($payments)
        ];

        return response()->json($response);
    }

    public function show(Payment $payment, Request $request) 
    {
        $father = $request->get('father');

        if($payment->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
                ]
            ], 403);
        }

        $payment->load([
            'subscription:id,ref,package_id,student_id,started_at,expired_at,initiated_at,days',
            'subscription.package:id,name,name_ar,code,sale_price,price,days,school_id',
            'subscription.package.school:id,name,name_ar,file_id',
            'subscription.package.school.logo:id,path,current_name',
            'subscription.student:id,firstname,lastname,file_id',
            'subscription.student.image:id,path,current_name',
            'subscription.payment:id,subscription_id,status,payment_option,card_number,card_holder_name,firstname,lastname,email,phone,address,state,city,zipcode'
        ]);

        $response = [
            'status' => 'success',
            'data' => [
                'payment' => $payment, 
            ],
        ];

        return response()->json($response);
    }

    public function testPayment(){
        $request = new ProcessPaymentRequest([
            'subscription_id' => '46',
            'customer_email' => 'test@test.com',
            'customer_ip' => '127.0.0.1',
            'payment_method_id' => '26',
            'billing_id' => '1',
        ]);

        // Call the processPayment method with the populated request.
        return $this->process($request);
    }

    public function process(ProcessPaymentRequest $request){
        $father = $request->get('father');

        $subscription = Subscription::findOrFail($request->input('subscription_id'));

        if($request->has('coupon_id') && $request->input('coupon_id') != null){
            $coupon = Coupon::findOrFail($request->get('coupon_id'));
            $subscription->applyCoupon($coupon);
        }

        $subscription->calculateTotal();
        $subscription->save();

        $paymentMethod = PaymentMethod::findOrFail($request->input('payment_method_id'));

        $payfort_url = env('PAYFORT_IS_SANDBOX') ? env('PAYFORT_API_TEST_URL') : env('PAYFORT_API_PROD_URL');
        
        $payload = [
            'command' => 'PURCHASE',
            'language' => 'en',
            'access_code' => env('PAYFORT_ACCESS_CODE'),
            'merchant_identifier' => env('PAYFORT_MERCHANT_ID'),
            'merchant_reference' => $subscription->ref,  
            'amount' => round($subscription->total, 2) * 100,
            'currency' => 'SAR',
            'customer_email' => $request->input('customer_email'), 
            'customer_ip' => $request->input('customer_ip'), 
            'token_name' => $paymentMethod->token_name,
            'signature' => $this->calculateSignature([
                'command=PURCHASE',
                'language=en',
                'access_code='.env('PAYFORT_ACCESS_CODE'),
                'merchant_identifier='.env('PAYFORT_MERCHANT_ID'),
                'merchant_reference='.$subscription->ref,
                'amount='.round($subscription->total, 2) * 100,
                'currency=SAR',
                'customer_email='.$request->input('customer_email'),
                'customer_ip='.$request->input('customer_ip'),
                'token_name='.$paymentMethod->token_name
            ]),
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json', 
        ])->post($payfort_url, $payload);

        $responseData = $response->json();

        $payment = $subscription->payment;

        if(is_null($payment)){
            $payment = Payment::create([
                'fort_id' => key_exists('fort_id', $responseData) ? $responseData['fort_id']:  null,
                'status' => $responseData['status'],
                'response_code' => $responseData['response_code'],
                'response_message' => $responseData['response_message'],
                'payment_option' => key_exists('payment_option', $responseData) ? $responseData['payment_option']:  null,
                'card_number' => key_exists('card_number', $responseData) ? $responseData['card_number']:  null,
                'card_holder_name' => key_exists('card_holder_name', $responseData) ? $responseData['card_holder_name']:  null,
                'amount' => $responseData['amount'],
                'father_id' => $father->id,
                'subscription_id' => $subscription->id
            ]);

            $payment->save();
        }

        $payment->applyBilling($request->input('billing_id'));
        $payment->save();

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
            $payment->update(['paid_at' => now()]);

            $subscription->start();

            return response()->json([
                'status' => 'success',
                'data' => [
                    'merchant_reference' => $subscription->ref
                ]
            ]);
            
        }else{
            return response()->json([
                'status' => 'error',
                'error' => $responseData['response_message']
            ]);
        }
    }

    public function processRedirection(ProcessPaymentRequest $request){
        $subscription = Subscription::findOrFail($request->input('subscription_id'));

        if($request->has('coupon_id') && $request->input('coupon_id') != null){
            $coupon = Coupon::findOrFail($request->get('coupon_id'));
            $subscription->applyCoupon($coupon);
        }

        $subscription->calculateTotal();
        $subscription->save();

        $paymentMethod = null;

        if(!is_null($request->input('payment_method_id')))
            $paymentMethod = PaymentMethod::findOrFail($request->input('payment_method_id'));

        $payfort_url = env('PAYFORT_IS_SANDBOX') ? env('PAYFORT_API_TEST_URL') : env('PAYFORT_API_PROD_URL');
        
        $payload = [
            'command' => 'PURCHASE', 
            'language' => $request->get('language'),
            'access_code' => env('PAYFORT_ACCESS_CODE'),
            'merchant_identifier' => env('PAYFORT_MERCHANT_ID'),
            'merchant_reference' => $subscription->ref,  
            'amount' => round($subscription->total, 2) * 100, 
            'currency' => 'SAR',
            'customer_email' => $request->input('customer_email'), 
            'customer_ip' => $request->input('customer_ip'), 
            'return_url' => $request->input('return_url'),
            'remember_me' => 'YES',
            'merchant_extra1' => $request->input('billing_id')
        ];

        $signature = [
            'command=PURCHASE', 
            'language='.$request->get('language'),
            'access_code='.env('PAYFORT_ACCESS_CODE'),
            'merchant_identifier='.env('PAYFORT_MERCHANT_ID'),
            'merchant_reference='.$subscription->ref,
            'amount='.round($subscription->total, 2) * 100,
            'currency=SAR',
            'customer_email='.$request->input('customer_email'),
            'customer_ip='.$request->input('customer_ip'),
            'return_url='.$request->input('return_url'),
            'remember_me=YES',
            'merchant_extra1='.$request->input('billing_id')
        ];

        if(!is_null($paymentMethod)){
            $payload['token_name'] = $paymentMethod->token_name;
            $signature = array_push($signature, 'token_name='.$paymentMethod->token_name);
        }

        $payload['signature'] = $this->calculateSignature($signature);

        return response()->json([
            'status' => 'success',
            'data' => [
                'url' => $payfort_url,
                'payload' => $payload
            ]
        ]);
    }

    public function webhookRedirection(Request $request){
        $responseData = $request->all();

        if (Str::startsWith($responseData['merchant_reference'], 'BS') == false) return; 

        $subscription = Subscription::where('ref', $responseData['merchant_reference'])->first();
        if(is_null($subscription))
            return;
        
        $payment = $subscription->payment;

        if(is_null($payment)){
            $payment = Payment::create([
                'fort_id' => key_exists('fort_id', $responseData) ? $responseData['fort_id']:  null,
                'status' => $responseData['status'],
                'response_code' => $responseData['response_code'],
                'response_message' => $responseData['response_message'],
                'payment_option' => key_exists('payment_option', $responseData) ? $responseData['payment_option']:  null,
                'card_number' => key_exists('card_number', $responseData) ? $responseData['card_number']:  null,
                'card_holder_name' => key_exists('card_holder_name', $responseData) ? $responseData['card_holder_name']:  null,
                'amount' => $responseData['amount'],
                'father_id' => $subscription->student->father->id,
                'subscription_id' => $subscription->id
            ]);

            $payment->applyBilling($responseData['merchant_extra1']);

            $payment->save();
        }else{
            $payment->update([
                'status' => $responseData['status'],
                'response_code' => $responseData['response_code'],
                'response_message' => $responseData['response_message'],
            ]);
        }

        if($responseData['status'] == 14){
            $payment->update([
                'status' => $responseData['status'],
                'response_code' => $responseData['response_code'],
                'response_message' => $responseData['response_message'],
                'paid_at' => now()
            ]);

            $subscription->start();
        }
    }

    public function checkPayment($ref){
        $subscription = Subscription::where('ref', $ref)->first();

        if($subscription === null){
            return response()->json([
                'status' => 'error',
                'error' => [
                    'message' => 'Subscription Not found on our server, please contact the administration',
                ]
            ]);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'payment' => $subscription->payment
            ]
        ]);
    }

    public function paymentReturn(Request $request){
        $responseData = $request->all();

        $subscription = Subscription::where('ref', $responseData['merchant_reference'])->first();
        if(is_null($subscription))
            return;
        
        $payment = $subscription->payment;

        if(is_null($payment)){
            $payment = Payment::create([
                'fort_id' => key_exists('fort_id', $responseData) ? $responseData['fort_id']:  null,
                'status' => $responseData['status'],
                'response_code' => $responseData['response_code'],
                'response_message' => $responseData['response_message'],
                'payment_option' => key_exists('payment_option', $responseData) ? $responseData['payment_option']:  null,
                'card_number' => key_exists('card_number', $responseData) ? $responseData['card_number']:  null,
                'card_holder_name' => key_exists('card_holder_name', $responseData) ? $responseData['card_holder_name']:  null,
                'amount' => $responseData['amount'],
                'father_id' => $subscription->student->father->id,
                'subscription_id' => $subscription->id
            ]);

            $payment->save();
        }else{
            $payment->update([
                'status' => $responseData['status'],
                'response_code' => $responseData['response_code'],
                'response_message' => $responseData['response_message'],
            ]);
        }

        if($responseData['status'] == 14){
            $payment->update([
                'paid_at' => now()
            ]);

            $subscription->start();
        }
        
        $script = "<script>window.close();</script>";
        return response($script)->header('Content-Type', 'text/html');
    }

    public function webhook(Request $request){
        $responseData = $request->all();

        $subscription = Subscription::where('ref', $responseData['merchant_reference'])->first();
        if(is_null($subscription))
            return;
        
        $payment = $subscription->payment;

        if(is_null($payment)){
            $payment = Payment::create([
                'fort_id' => key_exists('fort_id', $responseData) ? $responseData['fort_id']:  null,
                'status' => $responseData['status'],
                'response_code' => $responseData['response_code'],
                'response_message' => $responseData['response_message'],
                'payment_option' => key_exists('payment_option', $responseData) ? $responseData['payment_option']:  null,
                'card_number' => key_exists('card_number', $responseData) ? $responseData['card_number']:  null,
                'card_holder_name' => key_exists('card_holder_name', $responseData) ? $responseData['card_holder_name']:  null,
                'amount' => $responseData['amount'],
                'father_id' => $subscription->student->father->id,
                'subscription_id' => $subscription->id
            ]);

            $payment->save();
        }else{
            $payment->update([
                'status' => $responseData['status'],
                'response_code' => $responseData['response_code'],
                'response_message' => $responseData['response_message'],
            ]);
        }

        if($responseData['status'] == 14){
            $payment->update([
                'paid_at' => now()
            ]);

            $subscription->start();
        }

        if($responseData['status'] == 14){
            $payment->update([
                'status' => $responseData['status'],
                'response_code' => $responseData['response_code'],
                'response_message' => $responseData['response_message'],
                'paid_at' => now()
            ]);

            $subscription->start();
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
}