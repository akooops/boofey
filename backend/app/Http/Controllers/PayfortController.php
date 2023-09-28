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
use App\Models\School;
use App\Models\User;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PayfortController extends Controller
{
    public function index(){
        return view('payfort');
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
                'hashed' => $this->hash($fields, $request->input('prefix'))
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
        dd($request->all());
    }
}