<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PasswordReset extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone',
        'token',
        'expires_at',
    ];

    public function generateToken(){
        $token = null;

        do {
            $token = Str::random(12);
        
            $passwordReset = PasswordReset::where('token', $token)->first();
        } while ($passwordReset != null);

        $this->token = $token;
    }
}
