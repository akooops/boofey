<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\School;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class CanGenerateInvoice implements Rule
{
    protected $subscriptionId;  

    public function __construct($subscriptionId)
    {
        $this->subscriptionId = $subscriptionId;
    }

    public function passes($attribute, $value)
    {
        $subscription = Subscription::findOrFail($this->subscriptionId);
        
        return (is_null($subscription->invoice));
    }

    public function message()
    {
        return __('translations.can_generate_invoice');
    }
}
