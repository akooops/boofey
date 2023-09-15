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
        $this->discount = ($coupon == null) ? 0 : $coupon->discount;
    }

    public function calculateTotal(){
        $this->calculateDiscount();

        $total = $this->subtotal - $this->subtotal * ($this->discount / 100);
        $total = $total + $total * ($this->tax / 100);

        $this->total = $total;
    }

    public function saveFromPackageInfo($package, $saveFromPackageInfo = true, $tax = null, $subtotal = null){
        $this->package_id = $package->id;

        $this->tax = ($saveFromPackageInfo == true) ? $package->tax : $tax;
        $this->subtotal = ($saveFromPackageInfo == true) ? $package->currentPrice : $subtotal; 
    }

    public function applyCoupon($coupon){
        if($coupon->onhold == true) return;
        if($coupon->used >= $coupon->max) return;

        $this->coupon_id = $coupon->id;

        $coupon->increment('used');
    }

    public function saveSubscriptionInfo($student, $days, $balence, $shouldStartAt){
        $subscription = new Subscription([
            'days' => $days,
            'balance' => $balence,
            'should_start_at' => $shouldStartAt,
            'student_id' => $student->id,
            'payment_id' => $this->id, 
        ]);
    
        $subscription->save();
    }

    public function updateSubscriptionInfo($days, $balance, $shouldStartAt)
    {
        $this->subscription->update([
            'days' => $days,
            'balance' => $balance,
            'should_start_at' => $shouldStartAt,
        ]);
    }
}
