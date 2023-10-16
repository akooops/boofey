<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Student;
use Carbon\Carbon;

class UpdateSubscriptions extends Command
{
    protected $signature = 'subscriptions:update';
    protected $description = 'Update student subscriptions';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $students = Student::all();

        foreach ($students as $student) {
            $activeSubscription = $student->activeSubscription;

            if ($activeSubscription && $student->onhold != true) {
                $activeSubscription->decrement('balance');


                if($activeSubscription->balance <= 0){
                    $activeSubscription->expire();
                    
                    $inactiveSubscription = $student->inactiveSubscriptions()->first();

                    if ($inactiveSubscription !== null) {
                        // Set the started_at of the first subscription to yesterday
                        $inactiveSubscription->activate();
                    }
                }

                continue;
            }

            if($student->onhold != true) {
                // Find subscriptions with balance > 0, started_at is null, and order by should_start_at
                $inactiveSubscription = $student->inactiveSubscriptions()->first();

                if ($inactiveSubscription !== null) {
                    // Set the started_at of the first subscription to yesterday
                    $inactiveSubscription->activate();
                }
            }
        }

        $this->info('Subscriptions updated successfully.');
    }
}
