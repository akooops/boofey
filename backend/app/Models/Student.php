<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $appends = ['fullname', "subscribed", 'subscribedPackage', "tookSnackToday", 'tookMainMealToday', 'className', 'classNameAr'];

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
        'archived'
    ];

    public function image()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
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

    public function currentSubscription(){
        return $this->hasOne(Subscription::class, 'student_id', 'id')->where('balance', '>', 0)->where('started_at', '!=', NULL);
    }

    public function getTookSnackTodayAttribute()
    {
        $today = Carbon::today();

        return $this->belongsToMany(Queue::class, 'queue_students', 'student_id', 'queue_id')
        ->where('queues.type', 1)
        ->whereDate('queues.started_at', $today)
        ->pluck('queues.id');
    }

    public function getTookMainMealTodayAttribute()
    {
        $today = Carbon::today();

        return $this->belongsToMany(Queue::class, 'queue_students', 'student_id', 'queue_id')
        ->where('queues.type', 0)
        ->whereDate('queues.started_at', $today)
        ->pluck('queues.id');
    }

    function getSubscribedAttribute() {  
        return ($this->currentSubscription === null) ? false : true;
    }

    public function getFullnameAttribute()
    {
        return $this->firstname . ' ' . $this->lastname;
    }

    public function getSubscribedPackageAttribute(){
        $currentSubscription = $this->currentSubscription;
        if($currentSubscription !== null && $currentSubscription->payment !== null){
            $payment = $this->currentSubscription->payment;

            if($payment !== null && $payment->package !== null)
                return $payment->package->code;
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
            6 => 'Middle  School - Grade 1',
            7 => 'Middle  School - Grade 2',
            8 => 'Middle  School - Grade 3',
            9 => 'Secondary  School - Grade 1',
            10 => 'Secondary  School - Grade 2',
            11 => 'Secondary  School - Grade 3',
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
            6 => 'الطور المتوسط - السنة الأولى',
            7 => 'الطور المتوسط - السنة الثانية',
            8 => 'الطور المتوسط - السنة الثالثة',
            9 => 'الطور الثانوي - السنة الأولى',
            10 => 'الطور الثانوي - السنة الثانية',
            11 => 'الطور الثانوي - السنة الثالثة',
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
}
