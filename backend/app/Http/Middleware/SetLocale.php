<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        // Check if it's an admin route or not.
        if (strpos($request->getPathInfo(), 'admin/') === 0) {
            app()->setLocale('en'); // Set to English for admin routes.
        } else {
            $requestedLanguage = $request->get('lang'); 

            if (in_array($requestedLanguage, ['en', 'ar'])) {
                app()->setLocale($requestedLanguage);
            } else {
                app()->setLocale('en');
            }
        }

        return $next($request);
    }
}
