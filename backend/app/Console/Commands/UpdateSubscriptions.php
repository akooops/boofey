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
            if($student->school->isTodayBreak == true) continue;

            $activeSubscription = $student->activeSubscription;

            if ($activeSubscription && $student->onhold != true) {
                $activeSubscription->decrement('balance');


                if($activeSubscription->balance <= 0){
                    $activeSubscription->expire();
                    
                    $inactiveSubscription = $student->inactiveSubscriptions()->first();

                    if ($inactiveSubscription !== null) {
                        $inactiveSubscription->activate();
                    }else{
                        if (env('ENABLE_SMS') == true) {
                            sendSMS("Boofey - Your child {$student->full_name} subscription is expired, consider renewing the plan", $student->father->user->phone);                    
                        }
                    }
                }

                continue;
            }

            if($student->onhold != true) {
                $inactiveSubscription = $student->inactiveSubscriptions()->first();

                if ($inactiveSubscription !== null) {
                    $inactiveSubscription->activate();
                }
            }
        }

        $this->info('Subscriptions updated successfully.');
    }
}
