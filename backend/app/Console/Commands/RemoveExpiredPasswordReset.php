<?php

namespace App\Console\Commands;

use App\Models\PasswordReset;
use Illuminate\Console\Command;
use Carbon\Carbon;

class RemoveExpiredPasswordReset extends Command
{
    protected $signature = 'password:remove-expired';

    protected $description = 'Remove all expired password reset tokens';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $expiredTokens = PasswordReset::where('expires_at', '<', Carbon::now())->get();

        foreach ($expiredTokens as $token) {
            $token->delete();
        }

        $this->info('Expired password reset tokens have been removed.');
    }
}
