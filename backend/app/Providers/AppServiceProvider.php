<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('username', function ($attribute, $value, $parameters, $validator) {
            // Use a regular expression to validate the username format
            return preg_match('/^[a-zA-Z0-9_]+$/', $value);
        });

        Validator::extend('phone', function ($attribute, $value, $parameters, $validator) {
            // Define the regular expression for a U.S. phone number (10 digits, optional hyphens or spaces)
            return preg_match("/^05\d{8}$/", $value);
        });

        Validator::extend('password', function ($attribute, $value, $parameters, $validator) {
            // Check if the password is at least 8 characters long
            // and contains at least one digit, one uppercase letter, or one special character
            return strlen($value) >= 8 && (preg_match('/[0-9]/', $value) || preg_match('/[A-Z]/', $value) || preg_match('/[\W]/', $value));
        });
    }
}
