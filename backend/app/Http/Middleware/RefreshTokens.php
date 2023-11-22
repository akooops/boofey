<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class RefreshTokens
{
    public function handle(Request $request, Closure $next)
    {
        $authorizationHeader = $request->header('Authorization');

        if ($authorizationHeader) {
            // Extract the token from the Authorization header
            $token = str_replace('Bearer ', '', $authorizationHeader);
            // Find the token in the database
            $accessToken = PersonalAccessToken::findToken($token);

            if ($accessToken) {
                if (now()->gt($accessToken->expires_at)) {
                    // Check if the token has expired within the last 4 hours

                    if ($accessToken->expires_at && now()->diffInHours($accessToken->expires_at) <= 4) {
                        $expiration = ($accessToken->name === 'long-lived-token') ? now()->addDays(3) : now()->addHour();
                        $tokenName = ($accessToken->name === 'long-lived-token') ? 'long-lived-token' : 'short-lived-token';

                        // Refresh the token
                        $newToken = $accessToken->tokenable->createToken(
                            $tokenName,
                            $accessToken->abilities,
                            $expiration // Refresh with a new expiration time
                        )->plainTextToken;

                        // Revoke the old token
                        $accessToken->delete();

                        // Attach the refreshed token to the request
                        $request->headers->set('Authorization', 'Bearer ' . $newToken);

                        $response = $next($request);

						// Add the refreshed Authorization header to the response
                        $response->headers->set('Authorization', 'Bearer ' . $newToken);

                        return $response;
                    }
                }
            }
        }

        // Continue with the auth:sanctum middleware
        return $next($request);
    }
}
