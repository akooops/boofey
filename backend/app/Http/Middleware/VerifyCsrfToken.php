<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'paymentMethods/store/*',
        'payments/return',
        'payments/webhook',
        'payfort',
        'payfort2',
        'search-face'
    ];
}
