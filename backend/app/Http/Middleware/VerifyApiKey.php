<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Canteen;
use Illuminate\Support\Facades\Crypt;

class VerifyApiKey
{
    public function handle(Request $request, Closure $next, $isCanteen = true)
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
        
        if($isCanteen === true){
            $canteen = Canteen::where('api_key', $apiKey)->first();

            if (!$canteen) {
                return response()->json([
                    'status' => 'error',
                    'errors' => [
                        '401' => 'Invalid API key.'
                    ]
                ], 401);
            }
    
            $request->attributes->add(['canteen' => $canteen]);
        } else{
            if ($apiKey !== env('APP_API_KEY')) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid API key',
                ], 401);
            }    
        }

        return $next($request);
    }
}
