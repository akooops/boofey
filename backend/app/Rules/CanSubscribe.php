<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\School;
use App\Models\Student;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class CanSubscribe implements Rule
{
    protected $shouldUploadFace = false;

    public function __construct()
    {

    }

    public function passes($attribute, $value)
    {
        $student = Student::findOrFail($value);

        if (is_null($student->face_id)) {
            $this->shouldUploadFace = true;
            return false; 
        }

        $subscriptions = Subscription::where('student_id', $value)
            ->whereIn('status', ['active', 'inactive']);

        return $subscriptions->count() < 2;
    }

    public function message()
    {
        if($this->shouldUploadFace == true)
            return __('translations.should_upload_face');

        return __('translations.can_subscribe');
    }
}
