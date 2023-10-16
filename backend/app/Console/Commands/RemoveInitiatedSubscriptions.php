<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Student;
use Carbon\Carbon;

class RemoveInitiatedSubscriptions extends Command
{
    protected $signature = 'subscriptions:remove-initiated';
    protected $description = 'Remove student initiated subscriptions';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $students = Student::all();

        foreach ($students as $student) {
            $initiatedSubscriptions = $student->initiatedSubscriptions()->where('initiated_at', '<', now()->addMinutes(10));

            $initiatedSubscriptions->delete();
        }

        $this->info('Initiated Subscriptions deleted successfully.');
    }
}
