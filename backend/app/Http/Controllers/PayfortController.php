<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Requests\Students\StoreStudentRequest;
use App\Http\Requests\Profiles\UpdateProfileRequest;
use App\Http\Requests\Users\PasswordResetRequest;
use App\Models\AcademicYear;
use App\Models\Father;
use App\Models\File;
use App\Models\PaymentMethod;
use App\Models\School;
use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PayfortController extends Controller
{
    public function index(){
        $timestamp = now()->timestamp;

        // Generate a random string (you can adjust the length as needed)
        $randomPart = Str::random(6); // Adjust the length as needed
    
        // Combine the timestamp and random part to create a reference
        $merchant_reference = $timestamp . $randomPart;

        return view('payfort', [
            'merchant_reference' => $merchant_reference
        ]);
    }

    public function index2(){
        $prefix = 'BS';
        $ref = null;

        do {
            $datePart = Carbon::now()->format('dmy');
            $randomPart = strtoupper(Str::random(6));
            $ref = "{$prefix}-{$datePart}{$randomPart}";

        } while (Subscription::where('ref', $ref)->exists());

        $merchant_reference = 'BS'.$ref;

        return view('payfort2', [
            'command' => 'PURCHASE',
            'amount' => round(10, 2) * 100,
            'merchant_identifier' => 'ZWAccRDQ',
            'merchant_reference' => $merchant_reference,
            'access_code' => 'UEP75xfrciwtXGA65Qea',
            'currency' => 'SAR',
            'language' => 'ar',
            'customer_email' => 'test@boofey.app',
            'return_url' => 'https://boofey.test/backend/public/payfort2',
            'remember_me' => 'YES',
            'merchant_extra1' => '1',
            'signature' => $this->calculateSignature([
                'command=PURCHASE',
                'language=ar',
                'access_code=UEP75xfrciwtXGA65Qea',
                'merchant_identifier=ZWAccRDQ',
                'merchant_reference='.$merchant_reference,
                'amount='.round(10, 2) * 100,
                'currency=SAR',
                'customer_email=test@boofey.app',
                'return_url=https://boofey.test/backend/public/payfort2',

            ]),
        ]);
    }

    public function paymentReturn2(Request $request){
        dd($request->all());
    }

    private function calculateSignature(array $fieldArray){
        $fields = [];
    
        foreach($fieldArray as $val) {
            $fieldSplitted = explode("=", $val);
            $fields[$fieldSplitted[0]] = $fieldSplitted[1];
        }
    
        return $this->hash($fields, 'S2yS10SxQ4Yyxmj@');
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