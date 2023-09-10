<?php

namespace App\Http\Middleware;

use Closure;

class ConvertBooleanStrings
{
    public function handle($request, Closure $next)
    {
        // Iterate through the request data
        $requestData = $request->all();
        foreach ($requestData as $key => $value) {
            if (is_string($value)) {
                // Convert 'true' to 1 and 'false' to 0
                if (strtolower($value) === 'true') {
                    $requestData[$key] = 1;
                } elseif (strtolower($value) === 'false') {
                    $requestData[$key] = 0;
                }
            }
        }

        // Replace the original values in the request
        $request->replace($requestData);

        return $next($request);
    }
}
