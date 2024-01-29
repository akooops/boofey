<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Subscription extends Model
{
    use HasFactory;

    protected $appends = ['discountCalculated', 'taxCalculated'];

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
        'should_start_at'
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
            $prefix = 'BS';
            $ref = null;

            do {
                $datePart = Carbon::now()->format('dmy');
                $randomPart = strtoupper(Str::random(6));
                $ref = "{$prefix}-{$datePart}{$randomPart}";

            } while (Subscription::where('ref', $ref)->exists());

            $subscription->ref = $ref;
        });
    }

    public function generateRef(){
        $prefix = 'BS';
        $ref = null;

        do {
            $datePart = Carbon::now()->format('dmy');
            $randomPart = strtoupper(Str::random(6));
            $ref = "{$prefix}-{$datePart}{$randomPart}";

        } while (Subscription::where('ref', $ref)->exists());

        $this->ref = $ref;
    }

    public function applyPackage($package){
        $this->package_id = $package->id;

        $this->subtotal = $package->currentPrice; 
        $this->days = $package->days; 
        $this->balance = $package->days; 
    }

    public function applyCoupon($coupon, Student $student = null){
        if($coupon === null || $coupon->onhold == true || $coupon->used >= $coupon->max) return;

        if ($student && $student->usedCoupons()->where('coupon_id', $coupon->id)->exists()) return;

        $usedCoupon = UsedCoupon::create([
            'student_id' => $student->id,
            'coupon_id' => $coupon->id
        ]);

        $usedCoupon->save();


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

    public function activate(){
        if($this->student_id == null) return;
        
        $subscriptions = Subscription::where('student_id', $this->student_id)->where('status', 'active')->count();

        if($subscriptions != 0) return;

        /*
        $today = Carbon::today(); 
        $should_start_at = Carbon::parse($this->should_start_at)->startOfDay(); 

        if ($this->should_start_at !== null && $today->lessThan($should_start_at)) return;
        */

        if($this->student->onhold == true) return;

        $this->update([
            'status' => 'active',
            'started_at' => now()
        ]);
    }

    public function start(){
        $this->update([
            'status' => 'inactive',
            'exclude_from_calculation' => false
        ]);

        $this->student()->update(['archived' => false]);
        $this->generateInvoice();
    }

    public function expire(){
        if($this->student_id == null) return;

        $this->update([
            'status' => 'expired',
            'expired_at' => now()
        ]);
    }

    public function generateInvoice(){
        if($this->invoice !== null) return null;

        $invoice = Invoice::create([
            'tax' => $this->tax,
            'discount' => $this->discount,
            'subtotal' => $this->subtotal,
            'total' => $this->total,
            'generated_at' => now(),
            'father_id' => ($this->student !== null && $this->student->father !== null) ? $this->student->father->id : null,
            'subscription_id' => $this->id,
        ]);

        $invoice->save();

        return $invoice->id;
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
