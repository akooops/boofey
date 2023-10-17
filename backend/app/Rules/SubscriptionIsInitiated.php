<?php

namespace App\Rules;

use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class SubscriptionIsInitiated implements Rule
{
    public function __construct()
    {

    }

    public function passes($attribute, $value)
    {
        $subscription = Subscription::find($value);

        if ($subscription && $subscription->status === 'initiated') {
            return true; 
        }

        return false; 
    }

    public function message()
    {
        return 'This subscription is already payed';
    }
}
