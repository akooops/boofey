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