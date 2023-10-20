<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\Queue;
use App\Models\School;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;

class NoActiveQueue implements Rule
{
    protected $queueId;
    protected $error;

    public function __construct($queueId)
    {
        $this->queueId = $queueId;
    }

    public function passes($attribute, $value)
    {
        $queue = Queue::findOrFail($this->queueId);
        $queueClosed = is_null($queue->closed_at) ? 'closing' : 'opening';

        $today = Carbon::today();
        
        $activeQueues = Queue::where('canteen_id', $queue->canteen->id)
            ->whereNotIn('id', [$queue->id])
            ->whereDate('started_at', $today)
            ->where('closed_at', null)
            ->count() > 0;


        $startedAtIsToday = $queue->started_at->isSameDay($today);

        if($queueClosed == 'opening' && $activeQueues == true){
            $this->error = 0;
            return false;
        } 
        if($queueClosed == 'opening' && $startedAtIsToday == false) {
            $this->error = 1;
            return false;
        }

        return true; 
    }


    public function message()
    {
        if($this->error == 0){
            return 'It exists an active queue for this canteen for today, consider closing it before opening this queue';
        }

        return 'This queue can\'t be opened for today';
    }
}
