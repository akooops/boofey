<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RefreshTokensRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function authenticated(){
        $user = Auth::user();

        $user = User::with([
            'profile:id,user_id,firstname,lastname',
            'profile.image:id,current_name,path',
            'roles:id,name,guard_name', 
            'roles.permissions:id,name,guard_name', 
        ])->find($user->id);

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $user
            ]
        ]);
    }

    public function login(LoginRequest $request)
    {
        // Attempt to authenticate the user
        if (Auth::attempt(['email' => $request->input('login'), 'password' => $request->password])
            || Auth::attempt(['username' => $request->input('login'), 'password' => $request->password])
            || Auth::attempt(['phone' => $request->input('login'), 'password' => $request->password])) 
        {
            $user = $request->user();
            // Revoke the user's existing token (if it exists)
            PersonalAccessToken::where('tokenable_id', $user->id)->delete();

            $expiration = ($request->get('keep_me_signed_in') == true || $request->get('keep_me_signed_in') == 'true') ? now()->addDays(2) : now()->addMinutes(1);
            $tokenName = ($request->get('keep_me_signed_in') == true || $request->get('keep_me_signed_in') == 'true')  ? 'long-lived-token' : 'short-lived-token';

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
        // Find the token in the database
        $accessToken = PersonalAccessToken::findToken($request->get('token'));

        if ($accessToken) {
            if (now()->gt($accessToken->expires_at)) {
                // Check if the token has expired within the last 4 hours
                if ($accessToken->expires_at && now()->diffInHours($accessToken->expires_at) <= 4) {
                    $expiration = ($accessToken->name === 'long-lived-token') ? now()->addDays(2) : now()->addMinutes(1);
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
