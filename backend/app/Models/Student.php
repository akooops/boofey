<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $appends = ["subscriped"];

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
        return $this->belongsTo(father::class);
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function subcriptions(){
        return $this->hasMany(Subscription::class, 'student_id', 'id');
    }

    public function currentSubscription(){
        return $this->hasOne(Subscription::class, 'student_id', 'id')->where('balance', '>', '0');
    }

    function getSubscripedAttribute() {  
        return ($this->currentSubscription == null) ? false : true;
    }
}
