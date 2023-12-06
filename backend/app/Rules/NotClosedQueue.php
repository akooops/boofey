<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\Queue;
use App\Models\School;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class NotClosedQueue implements Rule
{
    protected $queueID;

    public function __construct($queueID)
    {
        $this->queueID = $queueID;
    }

    public function passes($attribute, $value)
    {
        $queue = Queue::findOrFail($this->queueID);

        return !$queue->closed;
    }

    public function message()
    {
        return "This Queue is Alrady Closed And We Can't exit students from it";
    }
}
