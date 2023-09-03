<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'file_id',
    ];

    public function logo()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }

    public function academicYears()
    {
        return $this->hasMany(AcademicYear::class, 'school_id', 'id');
    }

    public function currentAcademicYear()
    {
        return $this->hasOne(AcademicYear::class, 'school_id', 'id')->where('current', 1);
    }
}
