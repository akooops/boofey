<?php

namespace App\Console\Commands;

use App\Models\Canteen;
use App\Models\PasswordReset;
use App\Models\Queue;
use App\Models\QueueStudent;
use App\Models\School;
use Illuminate\Console\Command;
use Carbon\Carbon;

class CloseQueues extends Command
{
    protected $signature = 'queues:close-unclosed';

    protected $description = 'Close unclosed queue items at the end of the day';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $now = now(); // Get the current date and time

        // Assuming you have a QueueItem model
        $unclosedQueues = Queue::whereNull('closed_at')
            ->where('started_at', '<', $now)
            ->update(['closed_at' => $now]);
        
        $schools = School::get();

        foreach($schools as $school){
            if($school->isTodayBreak == true) continue;

            $canteens = Canteen::where('school_id', $school->id)->get();

            foreach($canteens as $canteen){
                if($canteen->currentQueue) continue;
                
                $queue = Queue::create(
                    [
                        'type' => 0,
                        'canteen_id' => $canteen->id,
                        'started_at' => Carbon::today()->setTime(7, 0)
                    ]
                );
        
                $queue->save();
            }
        }


        $this->info("A current queue already exists for this canteen for today.");
    }
}
