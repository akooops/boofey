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
use App\Models\User;
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

    public function calculateSignature(Request $request){
        if($request->has('fields') && $request->input('fields') != null) {
            $fieldArray = explode("|", $request->input('fields'));
            $fields = [];
        
            foreach($fieldArray as $val) {
                $fieldSplitted = explode("=", $val);
                $fields[$fieldSplitted[0]] = $fieldSplitted[1];
            }
        
            return response()->json([
                'status' => 'success',
                'hashed' => $this->hash($fields, env('PAYFORT_SHA_REQUEST_PHRASE'))
            ]);
        }
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

    public function paymentReturn(Request $request){
        /*
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father === null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }
        */
        
        if($request->input('service_command') == 'TOKENIZATION'){
            if($request->input('status') == 18){
                $paymentMethod = PaymentMethod::create([
                    'card_number' => $request->input('card_number'),
                    'card_holder_name' => $request->input('card_holder_name'),
                    'card_bin' => $request->input('card_bin'),
                    'token_name' => $request->input('token_name'),
                    'father_id' => 1,
                ]);

                $paymentMethod->save();

                return redirect()->route('payfort')->with('success', 'Your card was added successfully');
            }

            return redirect()->route('payfort')->with('error', $request->input('response_message'));
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
        ], 404);
    }
}