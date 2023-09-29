<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use Illuminate\Http\Request;
use App\Http\Requests\Billings\StoreBillingRequest;
use App\Http\Requests\Billings\UpdateBillingRequest;
use App\Http\Requests\Packages\StorePackageRequest;
use App\Http\Requests\Payments\initPaymentMethodAddRequest;
use App\Http\Requests\Payments\StorePaymentMethodRequest;
use App\Models\AcademicYear;
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

class PaymentsController extends Controller
{
    public function init(Student $student, Package $package){
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
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }

        Payment::where([
            'student_id' => $student->id,
            'package_id' => $package->id,
            'pending' => 1
        ])->delete();
        
        $payment = Payment::create([
            'father_id' => $father->id,
            'student_id' => $student->id,
            'pending' => 1
        ]);

        $payment->saveFromPackageInfo($package);
        $payment->calculateTotal();
        $payment->generateRef();
        $payment->save();

        $package->load('packageFeatures:id,name,checked,package_id');
        
        $student->load([
            'image:id,path,current_name', 
            'school:id,name,file_id',
            'school.logo:id,current_name,path'
        ]);

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
                'payment' => $payment
            ]
        ]);
    }

    private function getIp(){

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
        $paymentMethod = PaymentMethod::create(array_merge(
            $request->validated(),
            [
                'father_id' => $father->id 
            ]
        ));

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
                'merchant_id' => env('PAYFORT_MERCHANT_ID'),
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