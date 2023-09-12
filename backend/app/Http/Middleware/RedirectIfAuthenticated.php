<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Laravel\Sanctum\PersonalAccessToken;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, $guard = null)
    {
        $token = Cookie::get('SID');

        // Verify the token and authenticate the user
        $accessToken = PersonalAccessToken::findToken($token);

        // Check if the token has expired by comparing with the current time
        if ($accessToken && now()->lt($accessToken->expires_at)) {
            return response()->json([
                'status' => 'success',
                'message' => 'You are already logged in!'
            ]);
        }

        return $next($request);
    }
}
