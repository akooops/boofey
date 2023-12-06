<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\Queue;
use App\Models\QueueStudent;
use App\Models\School;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class StudentIsInQueue implements Rule
{
    protected $queueID;

    public function __construct($queueID)
    {
        $this->queueID = $queueID;
    }

    public function passes($attribute, $value)
    {
        $queueStudent = QueueStudent::where([
            'student_id' => $value,
            'queue_id' => $this->queueID
        ])->first();

        return (!is_null($queueStudent));
    }

    public function message()
    {
        return "This Students Isn't Entrolled In This Queue To Be Exited.";
    }
}
