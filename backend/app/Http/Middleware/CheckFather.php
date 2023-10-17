<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Canteen;
use App\Models\Father;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class CheckFather
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father === null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }
        
        $request->attributes->add(['father' => $father]);

        return $next($request);
    }
}
