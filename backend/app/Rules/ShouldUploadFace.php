<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\School;
use App\Models\Student;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class ShouldUploadFace implements Rule
{
    protected $studentId;

    public function __construct($studentId)
    {
        $this->studentId = $studentId;
    }

    public function passes($attribute, $value)
    {
        $student = Student::findOrFail($this->studentId);

        if (is_null($student->face_id)) return false; 

        return true;
    }

    public function message()
    {
        return __('translations.should_upload_face');
    }
}
