<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Payment extends Model
{
    use HasFactory;

    protected $appends = ["discountCalculated", 'taxCalculated'];

    protected $fillable = [
        'tax',
        'discount',
        'subtotal',
        'total',
        'father_id',
        'package_id',
        'coupon_id',
        'billing_id',
        'pending',
        'student_id',
        'ref',
        'payment_method_id',
        'fort_id'
    ];

    public function coupon()
    {
        return $this->hasOne(Coupon::class, 'id', 'coupon_id');
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    public function package()
    {
        return $this->hasOne(Package::class, 'id', 'package_id');
    }

    public function father()
    {
        return $this->belongsTo(Father::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function billing()
    {
        return $this->hasOne(Billing::class, 'id', 'billing_id');
    }

    public function paymentMethod()
    {
        return $this->hasOne(PaymentMethod::class, 'id', 'payment_method_id');
    }

    public function calculateDiscount(){
        $coupon = Coupon::find($this->coupon_id);
        $this->discount = ($coupon === null) ? 0 : $coupon->discount;
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

    public function saveSubscriptionInfoAfterPayment(){
        $package = Package::find($this->package_id);
        if($package === null) return;

        $student = Student::find($this->student_id);
        if($student === null) return;

        $school = School::find($student->school_id);
        if($school === null) return;

        $subscription = Subscription::where('payment_id', $this->id)->first();

        if($subscription != null){
            $subscription->update([
                'days' => $package->days,
                'balance' => $package->days,
                'should_start_at' => NULL,
                'student_id' => $student->id,
                'payment_id' => $this->id, 
            ]);
        }else{
            $subscription = new Subscription([
                'days' => $package->days,
                'balance' => $package->days,
                'should_start_at' => NULL,
                'student_id' => $student->id,
                'payment_id' => $this->id, 
            ]);
        
            $subscription->save();
        }

        $activeSubscription = $student->currentSubscription;

        if($activeSubscription === null && $student->onhold != true) {
            $subscription->update(['started_at' => now()]);
        }

        $student->update([
            'academic_year_id' => $school->currentAcademicYear->id,
            'archived' => false
        ]);
    }

    public function updateSubscriptionInfo($days, $balance, $shouldStartAt)
    {
        $this->subscription->update([
            'days' => $days,
            'balance' => $balance,
            'should_start_at' => $shouldStartAt,
        ]);
    }

    public function generateRef($prefix = 'PURCHASE'){
        $ref = null;

        do {
            $ref = "{$prefix}-".strtoupper(Str::random(8));
        
            $paymentWithRef = Payment::where('ref', $ref)->first();
        } while ($paymentWithRef != null);

        $this->ref = $ref;
    }

    public function updateBilling($id){
        $billing = Billing::find($id);
        if($billing === null) return;

        $this->billing_id = $billing->id;
    }

    public function updatePaymentMethod($id){
        $paymentMethod = PaymentMethod::find($id);
        if($paymentMethod === null) return;

        $this->payment_method_id = $paymentMethod->id;
    }

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
