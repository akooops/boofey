<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Laravel\Sanctum\PersonalAccessToken;

class CustomAuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = Cookie::get('sid');

        if (!$token) {
            return redirect('/login'); // Redirect to login if the cookie is missing
        }

        // Verify the token and authenticate the user
        $accessToken = PersonalAccessToken::findToken($token);

        if (!$accessToken) {
            return redirect('/login'); // Redirect to login if the token is invalid
        }

        // Check if the token has expired by comparing with the current time
        if ($accessToken->expires_at && now()->gt($accessToken->expires_at)) {
            // Token has expired
            $diffInHours = $accessToken->expires_at->diffInHours(now());

            if ($diffInHours <= 1) {
                // Within the last 1 hour, refresh the token
                $expiration = $request->input('keep_me_signed_in') ? now()->addDays(3) : now()->addMinutes(15);

                $newToken = $accessToken->tokenable->createToken('auth-token', ['*'], $expiration)->plainTextToken;
                // Revoke the last token
                $accessToken->delete();

                $accessToken = PersonalAccessToken::findToken($newToken);


                auth()->login($accessToken->tokenable);

                $response = $next($request);
                $response->cookie('sid', $newToken);
        
                return $response;
            } else {
                // Token has expired beyond the 1-hour refresh window, redirect to login
                return redirect('/login');
            }
        }

        // Authenticate the user
        auth()->login($accessToken->tokenable);

        return $next($request);
    }
}
