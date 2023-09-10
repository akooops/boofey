<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $appends = ["subscriped", "tookSnackToday", 'tookMainMealToday'];

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
        ->count() > 0 ? true : false;
    }

    public function getTookMainMealTodayAttribute()
    {
        $today = Carbon::today();

        return $this->belongsToMany(Queue::class, 'queue_students', 'student_id', 'queue_id')
        ->where('queues.type', 0)
        ->whereDate('queues.started_at', $today)
        ->count() > 0 ? true : false;
    }

    function getSubscripedAttribute() {  
        return ($this->currentSubscription == null) ? false : true;
    }
}
