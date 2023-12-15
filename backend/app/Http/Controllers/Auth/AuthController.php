<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\OtpRequest;
use App\Http\Requests\Auth\RefreshTokensRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Father;
use App\Models\User;
use App\Models\VerificationCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    public function authenticated(){
        $user = Auth::user();

        $user = User::with([
            'profile:id,user_id,firstname,lastname,file_id',
            'profile.image:id,current_name,path',
            'roles:id,name,guard_name', 
            'roles.permissions:id,name,guard_name', 
        ])->find($user->id);

        $father = Father::where('user_id', $user->id)->first();

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $user,
                'father' => $father
            ]
        ]);
    }

    public function register(RegisterRequest $request){
        $user = User::create(array_merge($request->validated()));
        $user->save();

        $parentRole = Role::where('name', 'parent')->first();
        if($parentRole === null){
            $parentRole = Role::create([
                'name' => 'parent'
            ]);

            $parentRole->save();
        }

        $user->syncRoles($parentRole->id);

        $user->profile()->create(array_merge($request->validated()));

        $father = Father::create([
            'user_id' => $user->id
        ]);

        $father->save();

        $expiration = now()->addMinutes(15);
        $tokenName = 'short-lived-token';

        $token = $user->createToken($tokenName, ['*'], $expiration);

        $expiration = now()->addMinutes(5);
        
        $verificationCode = new VerificationCode([
            'expires_at' => $expiration,
        ]);

        $verificationCode->generateCode();
        
        $user->verificationCodes()->save($verificationCode);

        if (env('ENABLE_SMS') == true) {
            sendSMS(
                "Boofey - Your verification code is: {$verificationCode->code}",
                $user->phone
            );
        }
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'roles' => $user->roles,
                'token' => $token->plainTextToken
            ]   
        ], 200);
    }

    public function otp(OtpRequest $request){
        $user = registerFather($request->input('identity_number'));

        if($user['status'] == 'error'){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'identity_number' => [__('translations.identity_number_not_found')]
                ]
            ], 422);
        }

        $user = $user['data']['user'];

        $user->verificationCodes()->delete();

        $expiration = now()->addMinutes(5);
        
        $verificationCode = new VerificationCode([
            'expires_at' => $expiration,
        ]);

        $verificationCode->generateCode();
        
        $user->verificationCodes()->save($verificationCode);

        if (env('ENABLE_SMS') == true) {
            sendSMS(
                "Boofey - Your verification code is: {$verificationCode->code}",
                $user->phone
            );
        }

        $response = [
            'status' => 'success',
            'data' => [
                'phone' => $user->phone
            ]
        ];

        if (env('ENABLE_SMS') == false) {
            $response['data'] = [
                'verificationCode' => $verificationCode->code,
                'phone' => $user->phone
            ];
        }

        return response()->json($response); 
    }

    public function loginAdmin(LoginRequest $request)
    {
        $user = Auth::user();

        if($user !== null){
            return response()->json([
                'status' => 'error',
                'error' => 'You are already logged in!'  
            ], 400);
        }

        $father = Father::where('identity_number', $request->input('login'))->first();

        // Attempt to authenticate the user
        if (   Auth::attempt(['email' => $request->input('login'), 'password' => $request->password])
            || Auth::attempt(['username' => $request->input('login'), 'password' => $request->password])
            || Auth::attempt(['phone' => $request->input('login'), 'password' => $request->password])
            || ($father && Auth::attempt(['id' => $father->user_id, 'password' => $request->password]))) 
        {
            $user = $request->user();
            // Revoke the user's existing token (if it exists)
            PersonalAccessToken::where('tokenable_id', $user->id)->delete();

            $expiration = $request->get('keep_me_signed_in') == true ? now()->addDays(3) : now()->addHour();
            $tokenName = $request->get('keep_me_signed_in') == true  ? 'long-lived-token' : 'short-lived-token';

            $user = $request->user();
            $token = $user->createToken($tokenName, ['*'], $expiration);

            $user = User::with([
                'profile:id,user_id,firstname,lastname',
                'profile.image:id,current_name,path',
                'roles:id,name,guard_name', 
                'roles.permissions:id,name,guard_name', 
            ])->find($user->id);

            // Redirect the user to the appropriate page
            if ($user->hasRole('parent')) {
                // Tell the frontend to redirect to the root
                return response()->json([
                    'status' => 'success',
                    'data' => [
                        'roles' => $user->roles,
                        'token' => $token->plainTextToken
                    ]   
                ], 200);
            } else {
                // Redirect the user to the admin panel
                return response()->json([
                    'status' => 'success',
                    'data' => [
                        'roles' => $user->roles,
                        'token' => $token->plainTextToken
                    ]   
                ], 200);
            }
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Authentication failed. The provided email or password is incorrect.',
        ], 200);
    }

    public function login(LoginRequest $request)
    {
        $user = Auth::user();

        if($user !== null){
            return response()->json([
                'status' => 'error',
                'error' => 'You are already logged in!'  
            ], 400);
        }

        $user = User::where('phone', $request->input('phone'))->first();

        if(is_null($user)){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'verification_code' => [
                        __('translations.invalid_verification_code')
                    ]
                ],
            ], 422);
        }

        $verificationCode = $user->verificationCodes()
            ->where('code', $request->input('verification_code'))
            ->where('expires_at', '>=', now())
            ->first();

        if ($verificationCode) {
            $verificationCode->delete(); 
            
            PersonalAccessToken::where('tokenable_id', $user->id)->delete();

            $expiration = now()->addHour();
            $tokenName = 'short-lived-token';

            $token = $user->createToken($tokenName, ['*'], $expiration);

            $user->load([
                'profile:id,user_id,firstname,lastname',
                'profile.image:id,current_name,path',
                'roles:id,name,guard_name', 
                'roles.permissions:id,name,guard_name', 
            ]);

            return response()->json([
                'status' => 'success',
                'data' => [
                    'roles' => $user->roles,
                    'token' => $token->plainTextToken
                ]   
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'verification_code' => [
                        __('translations.invalid_verification_code')
                    ]
                ],
            ], 422);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Authentication failed. The provided email or password is incorrect.',
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        // Revoke all of the user's tokens
        $user->tokens()->delete();

        // Perform any other logout logic you need
        Auth::logout();


        return response()->json([
            'status' => 'success',
            'message' => 'Succesfully logged out!'
        ], 200);
    }

    public function refreshTokens(RefreshTokensRequest $request){
        $token = str_replace('Bearer ', '', $request->get('token'));
        // Find the token in the database
        $accessToken = PersonalAccessToken::findToken($token);

        if ($accessToken) {
            if (now()->gt($accessToken->expires_at)) {
                // Check if the token has expired within the last 4 hours
                if ($accessToken->expires_at && now()->diffInHours($accessToken->expires_at) <= 4) {
                    $expiration = ($accessToken->name === 'long-lived-token') ? now()->addDays(2) : now()->addMinutes(15);
                    $tokenName = ($accessToken->name === 'long-lived-token') ? 'long-lived-token' : 'short-lived-token';

                    // Refresh the token
                    $newToken = $accessToken->tokenable->createToken(
                        $tokenName,
                        $accessToken->abilities,
                        $expiration // Refresh with a new expiration time
                    )->plainTextToken;

                    // Revoke the old token
                    $accessToken->delete();

                    return response()->json([
                        'status' => 'success',
                        'token' => $newToken
                    ], 200);
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'token' => $request->get('token')
        ], 200);    
    }
}
