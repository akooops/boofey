<?php

namespace App\Rules;

use App\Models\Canteen;
use App\Models\Package;
use App\Models\Queue;
use App\Models\QueueStudent;
use App\Models\School;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class StudentIsInQueue implements Rule
{
    protected $canteenId;

    public function __construct($canteenId)
    {
        $this->canteenId = $canteenId;
    }

    public function passes($attribute, $value)
    {
        $canteen = Canteen::findOrFail($this->canteenId);

        if(is_null($canteen->currentQueue)) return false;

        $queueStudent = QueueStudent::where([
            'student_id' => $value,
            'queue_id' => $canteen->currentQueue->id
        ])->first();

        return (!is_null($queueStudent));
    }

    public function message()
    {
        $canteen = Canteen::findOrFail($this->canteenId);

        if(is_null($canteen->currentQueue))
            return "This Canteen doesn't have an active queue";

        return "This Students Isn't Entrolled In This Queue To Be Exited.";
    }
}
