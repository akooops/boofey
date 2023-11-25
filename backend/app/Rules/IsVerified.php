<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\School;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class IsVerified implements Rule
{
    public function __construct()
    {

    }

    public function passes($attribute, $value)
    {
        $user = Auth::user();

        return is_null($user->phone_verified_at) ? true : false;
    }

    public function message()
    {
        return __('translations.is_verified');
    }
}
