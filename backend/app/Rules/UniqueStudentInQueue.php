<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\QueueStudent;
use Illuminate\Contracts\Validation\Rule;

class UniqueStudentInQueue implements Rule
{
    private $queueId;
    protected $ignoreId;

    public function __construct($queueId, $ignoreId = null)
    {
        $this->queueId = $queueId;
        $this->ignoreId = $ignoreId;
    }

    public function passes($attribute, $value)
    {
        $query = QueueStudent::where('queue_id', $this->queueId)
            ->where('student_id', $value);

        if ($this->ignoreId) {
            $query->where('id', '!=', $this->ignoreId);
        }

        return !$query->exists();
    }

    public function message()
    {
        return 'The student should be unique within the same queue.';
    }
}
