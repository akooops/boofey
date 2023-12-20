<?php

namespace App\Rules;

use App\Models\Canteen;
use App\Models\Package;
use App\Models\Queue;
use App\Models\QueueStudent;
use App\Models\School;
use App\Models\Student;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

use function PHPUnit\Framework\returnValue;

class CanStudentEnterQueue implements Rule
{
    protected $queueId;
    protected $enteredQueue = false;

    public function __construct($queueId)
    {
        $this->queueId = $queueId;
    }

    public function passes($attribute, $value)
    {
        if(is_null($this->queueId)) return false;
        
        $student = Student::findOrFail($value);
        $queue = Queue::findOrFail($this->queueId);

        if(
            ($student->tookMainMealToday == true && $queue->type == 0) ||
            ($student->tookSnackToday == true && $queue->type == 1)
        ){
            $this->enteredQueue = true;
            return false;
        }

        if($student->onhold == true) return false;
        if($student->archived == true) return false;
        if($student->subscribed == false) return false;

        if($student->school_id != $queue->canteen->school_id) return false;

        return true;
    }

    public function message()
    {
        if($this->enteredQueue == true)
            return "This Student Already Took His Meal";

        return "This Student Can't be Entrolled In This Queue.";
    }
}
