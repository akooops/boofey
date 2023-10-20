<?php

namespace App\Console\Commands;

use App\Models\PasswordReset;
use App\Models\Queue;
use App\Models\QueueStudent;
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

        $this->info("A current queue already exists for this canteen for today.");
    }
}
