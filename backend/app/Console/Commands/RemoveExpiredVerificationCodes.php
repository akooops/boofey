<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\VerificationCode;

class RemoveExpiredVerificationCodes extends Command
{
    protected $signature = 'verification:remove-expired';

    protected $description = 'Remove all expired phone verification codes';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $expiredCodes = VerificationCode::where('expires_at', '<', Carbon::now())->get();

        foreach ($expiredCodes as $code) {
            $code->delete();
        }

        $this->info('Expired phone verification codes have been removed.');
    }
}
