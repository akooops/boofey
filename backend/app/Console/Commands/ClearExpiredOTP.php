<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Student;

class ClearExpiredOTP extends Command
{
    protected $signature = 'otp:clear-expired';

    protected $description = 'Clear expired OTP for students';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $expiredStudents = Student::where('otp_expires_at', '<', Carbon::now())->get();

        foreach ($expiredStudents as $student) {
            $student->otp = null;
            $student->otp_expires_at = null;
            $student->save();
        }

        $this->info('Expired OTP for students has been cleared.');
    }
}
