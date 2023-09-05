<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

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

    public function logo()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }

    public function father()
    {
        return $this->belongsTo(father::class, 'id', 'father_id');
    }

    public function school()
    {
        return $this->belongsTo(School::class, 'id', 'school_id');
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'id', 'academic_year_id');
    }
}
