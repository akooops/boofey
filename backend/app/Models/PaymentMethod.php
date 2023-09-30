<?php

namespace App\Models;

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

    public function generateRef(){
        $ref = null;

        do {
            $ref = 'TOKENIZATION-'.strtoupper(Str::random(8));
        
            $paymentMethodWithRef = PaymentMethod::where('ref', $ref)->first();
        } while ($paymentMethodWithRef != null);

        $this->ref = $ref;
    }
}
