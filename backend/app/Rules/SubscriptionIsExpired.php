<?php

namespace App\Rules;

use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class SubscriptionIsExpired implements Rule
{
    public function __construct()
    {

    }

    public function passes($attribute, $value)
    {
        $subscription = Subscription::find($value);

        if ($subscription && $subscription->status === 'expired') {
            return false; 
        }

        return true; 
    }

    public function message()
    {
        return 'This subscription is expired. You can\'t disable it';
    }
}
