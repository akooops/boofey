<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function authenticate(){
        return response()->json([
            'error' => 'error', 
            'message' => 'You must be logged in to access this resource. Please log in or create an account.'
        ], 401);
    }

    public function login(Request $request)
    {
        // Validate the user's login credentials
        $request->validate([
            'login' => 'required',
            'password' => 'required',
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt(['email' => $request->input('login'), 'password' => $request->password])
            || Auth::attempt(['username' => $request->input('login'), 'password' => $request->password])
            || Auth::attempt(['phone' => $request->input('login'), 'password' => $request->password])) 
        {
            $user = $request->user();
            // Revoke the user's existing token (if it exists)
            $existingToken = $user->currentAccessToken();

            if ($existingToken) {
                $existingToken->delete();
            }

            $expiration = $request->input('keep_me_signed_in') ? now()->addDays(3) : now()->addMinutes(15);
            $tokenName = $request->input('keep_me_signed_in') ? 'long-lived-token' : 'short-lived-token';

            $user = $request->user();
            $token = $user->createToken($tokenName, ['*'], $expiration);

            $cookie = cookie('sid', $token->plainTextToken);

            return response()->json([
                'message' => 'Authentication successful. You are now logged in',
            ], 200)->withCookie($cookie);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Authentication failed. The provided email or password is incorrect.',
        ], 200);
    }
}
