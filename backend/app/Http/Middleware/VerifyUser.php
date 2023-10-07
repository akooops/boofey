<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyUser
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated and their phone is verified
        if ($request->user() && $request->user()->phone_verified_at === null) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Your phone number is not verified. Please verify your phone number to continue.'
                ]
            ], 403);
        }

        return $next($request);
    }
}
