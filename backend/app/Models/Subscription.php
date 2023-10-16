<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Subscription extends Model
{
    use HasFactory;

    protected $appends = ['expired', 'discountCalculated', 'taxCalculated'];

    protected $fillable = [
        'ref',
        'days',
        'balance',
        'started_at',
        'expired_at',
        'status',
        'exclude_from_calculation',
        'tax',
        'discount',
        'subtotal',
        'total',
        'initiated_at',
        'package_id',
        'student_id',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class, 'subscription_id', 'id');
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class, 'subscription_id', 'id');
    }

    /* Methods
        --------------------------------------------------------------------
    */

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($subscription) {
            $prefix = 'SUBSCRIPTION';
            $ref = null;

            do {
                $datePart = Carbon::now()->format('dmy');
                $randomPart = strtoupper(Str::random(8));
                $ref = "{$prefix}-{$datePart}{$randomPart}";

            } while (Subscription::where('ref', $ref)->exists());

            $subscription->ref = $ref;
        });
    }

    public function applyPackage($package){
        $this->package_id = $package->id;

        $this->subtotal = $package->currentPrice; 
        $this->days = $package->days; 
        $this->balance = $package->days; 
    }

    public function applyCoupon($couponId){
        $coupon = Coupon::find($couponId);
        if($coupon === null || $coupon->onhold == true || $coupon->used >= $coupon->max) return;

        $coupon->increment('used');

        $this->discount = ($coupon === null) ? 0 : $coupon->discount;
    }

    public function applyDiscount($discount){
        $this->discount = ($discount === null) ? 0 : $discount;
    }

    public function applyTax($tax){
        $this->tax = ($tax === null) ? 0 : $tax;
    }

    public function calculateTotal(){
        $total = $this->subtotal - $this->subtotal * ($this->discount / 100);
        $total = $total + $total * ($this->tax / 100);

        $this->total = $total;
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
