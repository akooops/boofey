<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invoice extends Model
{
    use HasFactory;

    protected $appends = ['discountCalculated', 'taxCalculated'];

    protected $fillable = [
        'ref',
        'tax',
        'discount',
        'subtotal',
        'total',
        'generated_at',
        'father_id',
        'subscription_id',
    ];

    public function father()
    {
        return $this->belongsTo(Father::class);
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    /* Methods
        --------------------------------------------------------------------
    */

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($subscription) {
            $prefix = 'INVOICE';
            $ref = null;

            do {
                $datePart = Carbon::now()->format('dmy');
                $randomPart = strtoupper(Str::random(8));
                $ref = "{$prefix}-{$datePart}{$randomPart}";

            } while (Subscription::where('ref', $ref)->exists());

            $subscription->ref = $ref;
        });
    }

    /* Appends
        --------------------------------------------------------------------
    */

    public function getDiscountCalculatedAttribute(){
        $discount = $this->subtotal * ($this->discount / 100);
        return number_format($discount, 2);
    }

    public function getTaxCalculatedAttribute(){
        $total = $this->subtotal - $this->subtotal * ($this->discount / 100);
        $tax = $total * ($this->tax / 100);

        return number_format($tax, 2);
    }
}
