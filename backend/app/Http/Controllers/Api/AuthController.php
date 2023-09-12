<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
            PersonalAccessToken::where('tokenable_id', $user->id)->delete();

            $expiration = $request->input('keep_me_signed_in') ? now()->addDays(3) : now()->addMinutes(15);
            $tokenName = $request->input('keep_me_signed_in') ? 'long-lived-token' : 'short-lived-token';

            $user = $request->user();
            $token = $user->createToken($tokenName, ['*'], $expiration);

            $cookie = cookie('sid', $token->plainTextToken);

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
                    'message' => 'Authentication successful. You are now logged in',
                    'data' => [
                        'user' => $user,
                    ]   
                ], 200)->withCookie($cookie)->withRedirect('/', [], false);
            } else {
                // Redirect the user to the admin panel
                return response()->json([
                    'message' => 'Authentication successful. You are now logged in',
                    'data' => [
                        'user' => $user,
                    ]   
                ], 200)->withCookie($cookie)->withRedirect('/admin', [], false);
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

        PersonalAccessToken::where('tokenable_id', $user->id)->delete();
        $cookie = Cookie::forget('sid');

        return response()->json([
            'message' => 'Logged out',
        ], 200)->withCookie($cookie);
    }
}
