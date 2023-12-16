<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\School;
use App\Models\Student;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class CanGenerateOtp implements Rule
{
    protected $studentID;

    public function __construct($studentID)
    {
        $this->studentID = $studentID;
    }

    public function passes($attribute, $value)
    {
        $student = Student::findOrFail($this->studentID);
        return $student->subscribed;
    }

    public function message()
    {
        return __('translations.can_geneate_otp');
    }
}
