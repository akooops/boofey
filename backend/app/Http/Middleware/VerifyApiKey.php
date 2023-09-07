<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Models\Canteen;

class VerifyApiKey
{
    public function handle(Request $request, Closure $next)
    {
        $apiKey = $request->header('X-Api-Key') ?? $request->query('api_key');

        if (!$apiKey) {
            return response()->json(['message' => 'API key not provided'], 401);

            return response()->json([
                'status' => 'error',
                'errors' => [
                    '401' => 'API key not provided.'
                ]
            ], 401);
        }

        try {
            $encryptedKey = Crypt::encrypt($apiKey);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '401' => 'Invalid API key.'
                ]
            ], 401);
        }

        $encryptedKey = Crypt::encrypt($apiKey);
        $canteen = Canteen::where('api_key', $encryptedKey)->first();

        if (!$canteen) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '401' => 'Invalid API key.'
                ]
            ], 401);
        }

        $request->attributes->add(['canteen' => $canteen]);

        return $next($request);
    }
}
