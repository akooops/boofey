<?php

namespace App\Http\Controllers;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Http\Requests\Users\VerifyUserRequest;
use App\Models\File;
use App\Models\School;
use App\Models\User;
use App\Models\VerificationCode;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function generateVerificationCode(){
        $user = Auth::user();
        $user = User::findOrFail($user->id);
        $user->verificationCodes()->delete();

        $expiration = now()->addMinutes(5);
        
        $verificationCode = new VerificationCode([
            'expires_at' => $expiration,
        ]);

        $verificationCode->generateCode();
        
        $user->verificationCodes()->save($verificationCode);

        $response = [
            'status' => 'success',
        ];

        if (config('app.debug')) {
            $response['data'] = [
                'verificationCode' => $verificationCode->code
            ];
        }

        return response()->json($response);
    }

    public function verify(VerifyUserRequest $request){
        $user = Auth::user();
        $user = User::findOrFail($user->id);

        $verificationCode = $user->verificationCodes()
            ->where('code', $request->input('verification_code'))
            ->where('expires_at', '>=', now())
            ->first();
        
        if ($verificationCode) {
            $verificationCode->delete(); 
            $user->phone_verified_at = now();
            $user->save();

            return response()->json([
                'status' => 'success'
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'verification_code' => [
                        'Invalid or expired verification code. Please try again.'
                    ]
                ],
            ], 422);
        }
    }
}