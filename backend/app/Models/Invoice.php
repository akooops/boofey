<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $appends = ['discountCalculated', 'taxCalculated'];

    protected $fillable = [
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
