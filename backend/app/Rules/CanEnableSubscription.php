<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\School;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class CanEnableSubscription implements Rule
{
    protected $studentID;
    protected $packageID;

    public function __construct($studentID, $packageID)
    {
        $this->studentID = $studentID;
        $this->packageID = $packageID;
    }

    public function passes($attribute, $value)
    {
        if (is_null($this->studentID)) {
            return false;
        }

        if (is_null($this->packageID)) {
            return false;
        }

        $subscriptions = Subscription::where('student_id', $value)
            ->whereIn('status', ['active', 'inactive']);

        return $subscriptions->count() < 2;
    }

    public function message()
    {
        if (is_null($this->studentID)) {
            return 'This subscription can\'t be enabled because the attached student was deleted.';
        }

        if (is_null($this->packageID)) {
            return 'This subscription can\'t be enabled because the attached package was deleted.';
        }

        return 'This student already have the maximum number of subscription at a given time.';
    }
}
