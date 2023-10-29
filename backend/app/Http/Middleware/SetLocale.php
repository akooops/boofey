<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {

        $requestedLanguage = $request->get('lang'); 
        
        if (in_array($requestedLanguage, ['en', 'ar'])) {
            app()->setLocale($requestedLanguage);
        } else {
            app()->setLocale('en');
        }

        return $next($request);
    }
}
