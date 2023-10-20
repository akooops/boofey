<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Student;
use App\Models\Subscription;
use Carbon\Carbon;

class DisableSubscriptions extends Command
{
    protected $signature = 'subscriptions:disable';
    protected $description = 'Disable subscriptions which aren\'t attached to a package or student';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        Subscription::whereNot('status', 'expired')->where('student_id', null)->orWhere('package_id', null)->update([
            'status' => 'disabled'
        ]);

        $this->info('Disbaled subscriptions successfully.');
    }
}
