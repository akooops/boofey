<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Student extends Model
{
    use HasFactory;

    protected $appends = ['fullname', "subscribed", "subscribedStatus", 'subscribedPackage', "tookSnackToday", 'tookMainMealToday', 'className', 'classNameAr', 'qrEnabled'];

    protected $fillable = [
        'name',
        'firstname',
        'lastname',
        'class',
        'nfc_id',
        'face_id',
        'onhold',
        'father_id',
        'school_id',
        'academic_year_id',
        'file_id',
        'otp',
        'otp_expires_at',
        'archived',
        'sis_number'
    ];

    public function image()
    {
        return $this->hasOne(File::class, 'id', 'file_id')->withDefault([
            'path' => '',
            'current_name' => 'default-profile.jpg',
        ]);;
    }

    public function father()
    {
        return $this->belongsTo(Father::class);
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function queues()
    {
        return $this->belongsToMany(Queue::class, 'queue_students', 'student_id', 'queue_id');
    }

    public function subscriptions(){
        return $this->hasMany(Subscription::class, 'student_id', 'id');
    }

    public function subscriptionsWithoutActive(){
        return $this->hasMany(Subscription::class, 'student_id', 'id')->whereNotIn('status', ['active', 'inactive', 'initiated']);
    }

    public function activeSubscription(){
        return $this->hasOne(Subscription::class, 'student_id', 'id')->where('status', 'active');
    }

    public function inactiveSubscriptions(){
        return $this->hasMany(Subscription::class, 'student_id', 'id')->where('status', 'inactive');
    }

    public function initiatedSubscriptions(){
        return $this->hasMany(Subscription::class, 'student_id', 'id')->where('status', 'initiated');
    }

    
    public function couponUsages()
    {
        return $this->hasMany(UsedCoupon::class);
    }

    public function usedCoupons()
    {
        return $this->belongsToMany(Coupon::class, 'used_coupons', 'student_id', 'coupon_id');
    }

    public function getTookSnackTodayAttribute()
    {
        $today = Carbon::today();

        $mealCount = $this->belongsToMany(Queue::class, 'queue_students', 'student_id', 'queue_id')
        ->where('queues.type', 1)
        ->whereDate('queues.created_at', $today->toDateString())
        ->count();
		
        return $mealCount > 0;
    }

    public function getTookMainMealTodayAttribute()
    {
        $today = Carbon::today();

        $mealCount = $this->belongsToMany(Queue::class, 'queue_students', 'student_id', 'queue_id')
        ->where('queues.type', 0)
        ->whereDate('queues.created_at', $today->toDateString())
        ->count();
		
        return $mealCount > 0;
    }

    function getSubscribedAttribute() {  
        return ($this->activeSubscription === null && count($this->inactiveSubscriptions) <= 0) ? false : true;
    }

    function getSubscribedStatusAttribute() {  
        if(is_null($this->activeSubscription) == false) return "Active Subscription";
        if(count($this->inactiveSubscriptions) > 0){
            return "Inactive Subscription";
        }

        return "No Subscription";
    }

    public function getFullnameAttribute()
    {
        return $this->firstname . ' ' . $this->lastname;
    }

    public function getSubscribedPackageAttribute(){
        $activeSubscription = $this->activeSubscription;
        if($activeSubscription !== null && $activeSubscription->package !== null){
            return $activeSubscription->package->code;
        }else if(count($this->inactiveSubscriptions) > 0 && $this->inactiveSubscriptions[0]->package !== null){
            return $this->inactiveSubscriptions[0]->package->code;
        }

        return null;
    }

    public function getClassNameAttribute(){
        $classNames = [
            0 => 'Primary School - Grade 1',
            1 => 'Primary School - Grade 2',
            2 => 'Primary School - Grade 3',
            3 => 'Primary School - Grade 4',
            4 => 'Primary School - Grade 5',
            5 => 'Primary School - Grade 6',
            6 => 'Middle  School - Grade 7',
            7 => 'Middle  School - Grade 8',
            8 => 'Middle  School - Grade 9',
            9 => 'Secondary  School - Grade 10',
            10 => 'Secondary  School - Grade 11',
            11 => 'Secondary  School - Grade 12',
        ];

        // Check if the provided number exists in the array
        if (array_key_exists($this->class, $classNames)) {
            // Return the class name
            return $classNames[$this->class];
        } else {
            // Return a default value or an error message if the number is not found
            return 'Class not defined';
        }
    }

    public function getClassNameArAttribute(){
        $classNames = [
            0 => 'الطور الإبتدائي - السنة الأولى',
            1 => 'الطور الإبتدائي - السنة الثانية',
            2 => 'الطور الإبتدائي - السنة الثالثة',
            3 => 'الطور الإبتدائي - السنة الرابعة',
            4 => 'الطور الإبتدائي - السنة الخامسة',
            5 => 'الطور الإبتدائي - السنة السادسة',
            6 => 'الطور المتوسط - السنة السابعة',
            7 => 'الطور المتوسط - السنة الثامنة',
            8 => 'الطور المتوسط - السنة التاسعة',
            9 => 'الطور الثانوي - السنة العاشرة',
            10 => 'الطور الثانوي - السنة الحادي عشر',
            11 => 'الطور الثانوي - السنة الثاني عشر',
        ];

        // Check if the provided number exists in the array
        if (array_key_exists($this->class, $classNames)) {
            // Return the class name
            return $classNames[$this->class];
        } else {
            // Return a default value or an error message if the number is not found
            return 'الصف غير محدد';
        }
    }

    public function getQrEnabledAttribute(){
        $school = $this->school()->first();

        return (is_null($school)) ? false : $school->qr_enabled;
    }
}
