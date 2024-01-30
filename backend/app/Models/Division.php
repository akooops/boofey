<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_ar',
        'school_id',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function students(){
        return $this->hasMany(Student::class, 'student_id', 'id');
    }
}
