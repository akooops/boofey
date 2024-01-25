<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\School;
use App\Models\Student;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class CanSubscribe implements Rule
{
    public function __construct()
    {

    }

    public function passes($attribute, $value)
    {
        $student = Student::findOrFail($value);

        $subscriptions = Subscription::where('student_id', $value)
            ->whereIn('status', ['active', 'inactive']);

        return $subscriptions->count() < 2;
    }

    public function message()
    {
        return __('translations.can_subscribe');
    }
}
