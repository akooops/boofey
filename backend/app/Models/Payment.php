<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'ref',
        'description',
        'fort_id',
        'status',
        'response_code',
        'response_message',
        'payment_option',
        'card_number',
        'card_holder_name',
        'amount',
        'paid_at',
        'firstname',
        'lastname',
        'email',
        'phone',
        'address',
        'state',
        'city',
        'zipcode',
        'father_id',
        'subscription_id',
    ];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    public function father()
    {
        return $this->belongsTo(Father::class);
    }

    public function billing()
    {
        return $this->hasOne(Billing::class, 'id', 'billing_id');
    }

    /* Methods
        --------------------------------------------------------------------
    */

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($subscription) {
            $prefix = 'PAYMENT';
            $ref = null;

            do {
                $datePart = Carbon::now()->format('dmy');
                $randomPart = strtoupper(Str::random(8));
                $ref = "{$prefix}-{$datePart}{$randomPart}";

            } while (Subscription::where('ref', $ref)->exists());

            $subscription->ref = $ref;
        });
    }

    public function applyBilling($billingID){
        $billing = Billing::find($billingID);
        if($billing === null) return;

        $this->firstname = $billing->firstname;
        $this->lastname = $billing->lastname;
        $this->email = $billing->email;
        $this->phone = $billing->phone;
        $this->address = $billing->address;
        $this->state = $billing->state;
        $this->city = $billing->city;
        $this->zipcode = $billing->zipcode;
    }
}
