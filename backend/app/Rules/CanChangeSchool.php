<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\School;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class CanChangeSchool implements Rule
{
    protected $studentID;

    public function __construct($studentID)
    {
        $this->studentID = $studentID;
    }

    public function passes($attribute, $value)
    {
        $subscriptions = Subscription::where('student_id', $this->studentID)
            ->whereIn('status', ['active', 'inactive']);

        return $subscriptions->count() > 0 ? false : true;
    }

    public function message()
    {
        return __('translations.can_change_school');
    }
}
