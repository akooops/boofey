<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_number',
        'card_holder_name',
        'card_bin',
        'expiry_date',
        'token_name',
        'father_id',
        'ref'
    ];

    public function father()
    {
        return $this->belongsTo(Father::class);
    }
    
    protected static function booted()
    {
        parent::booted();

        static::creating(function ($paymentMethod) {
            $prefix = 'TOKENIZATION';
            $ref = null;

            do {
                $datePart = Carbon::now()->format('dmy');
                $randomPart = strtoupper(Str::random(8));
                $ref = "{$prefix}-{$datePart}{$randomPart}";

            } while (PaymentMethod::where('ref', $ref)->exists());

            $paymentMethod->ref = $ref;
        });
    }
}
