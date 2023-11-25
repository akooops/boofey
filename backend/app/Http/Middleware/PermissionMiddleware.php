<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Models\Permission;

class PermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $permission = null, $guard = null)
    {
        if(env('ENABLE_PERMISSIONS') == false){
            return $next($request);
        }

        $authGuard = app('auth')->guard($guard);

        if ($authGuard->guest()) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);        
        }

        if (! is_null($permission)) {
            $permissions = is_array($permission)
                ? $permission
                : explode('|', $permission);
        }

        if ( is_null($permission) ) {
            $permission = $request->route()->getName();

            $permissions = array($permission);
        }
        

        foreach ($permissions as $permission) {            
            foreach ($authGuard->user()->roles as $role) {
                if ($role->hasPermissionTo($permission)) {
                    return $next($request);

                }
            }
        }
        
        return response()->json([
            'status' => 'error',
            'errors' => [
                '403' => 'User does not have the right permissions.'
            ]
        ], 403);   
    }
}