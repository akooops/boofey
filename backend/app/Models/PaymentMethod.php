<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_number',
        'card_holder_name',
        'card_bin',
        'token_name',
        'father_id'
    ];

    public function father()
    {
        return $this->belongsTo(Father::class);
    }
}
