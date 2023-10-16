<?php

namespace App\Rules;

use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class SubscriptionIsEnabled implements Rule
{
    public function __construct()
    {

    }

    public function passes($attribute, $value)
    {
        $subscription = Subscription::find($value);

        if ($subscription && $subscription->status === 'disabled') {
            return true; 
        }

        return false; 
    }

    public function message()
    {
        return 'The subscription must be disabled for this action.';
    }
}
