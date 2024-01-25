<?php

namespace App\Console\Commands;

use App\Models\Student;
use Illuminate\Console\Command;

class NotifyExpiringSoonStudents extends Command
{
    protected $signature = 'notify:expiring-soon-students';
    protected $description = 'Notify students with soon expiring memberships';

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

            if($activeSubscription !== null && $student->onhold != true) {
                // Find subscriptions with balance > 0, started_at is null, and order by should_start_at
                $subscriptions = $student->inactiveSubscriptions()->get();

                if ($subscriptions->isEmpty()) {
                    if($activeSubscription->balance == 2 && env('ENABLE_SMS') == true){
                        sendSMS("Boofey - Your child {$student->full_name} subscription will expire in two days, consider renewing the plan", $student->father->user->phone);
                    }
                }
            }
        }

        $this->info('Notifications sent successfully.');
    }
}
