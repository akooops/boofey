<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class VerificationCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'expires_at',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function generateCode(){
        $code = null;

        do {
            $code = mt_rand(100000, 999999);;
        
            $verificationCode = VerificationCode::where('code', $code)->first();
        } while ($verificationCode != null);

        $this->code = $code;
    }
}
