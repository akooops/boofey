<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\School;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class CanSubscribe implements Rule
{
    public function __construct()
    {

    }

    public function passes($attribute, $value)
    {
        $subscriptions = Subscription::where('student_id', $value)
            ->whereIn('status', ['active', 'inactive']);

        return $subscriptions->count() < 2;
    }

    public function message()
    {
        return 'This student already have the maximum number of subscription at a given time.';
    }
}
