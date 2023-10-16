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
            // Check if the student has an active subscription and is not on hold
            $activeSubscription = $student->activeSubscription;

            if ($activeSubscription && $student->onhold != true) {
                // Subtract a day from the balance
                $activeSubscription->decrement('balance');
            }

            $activeSubscription = $student->activeSubscription;

            if($activeSubscription === null && $student->onhold != true) {
                // Find subscriptions with balance > 0, started_at is null, and order by should_start_at
                $subscriptions = $student->subscriptions()->where('balance', '>', 0)
                    ->whereNull('started_at')
                    ->orderByRaw('ISNULL(should_start_at) DESC, should_start_at ASC')
                    ->get();

                if ($subscriptions->isNotEmpty()) {
                    // Set the started_at of the first subscription to yesterday
                    $firstSubscription = $subscriptions->first();
                    $firstSubscription->update(['started_at' => now()]);
                }
            }
        }

        $this->info('Subscriptions updated successfully.');
    }
}
