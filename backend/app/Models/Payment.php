<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'tax',
        'discount',
        'subtotal',
        'total',
        'father_id',
        'package_id',
        'coupon_id',
    ];

    public function coupon()
    {
        return $this->hasOne(Coupon::class, 'id', 'coupon_id');
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class, 'id', 'payment_id');
    }

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function father()
    {
        return $this->belongsTo(father::class);
    }

    public function calculateDiscount(){
        $coupon = Coupon::find($this->coupon_id);
        return($coupon == null) ? 0 : $coupon->discount;
    }

    public function calculateTotal(){
        $total = $this->subtotal - $this->subtotal * ($this->discount / 100);
        $total = $total + $total * ($this->tax / 100);

        return $total;
    }
}
