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

    public function packages()
    {
        return $this->hasMany(Package::class, 'school_id', 'id');
    }

    public function yearlyPackages()
    {
        return $this->hasMany(Package::class, 'school_id', 'id')->where('yearly', true);
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'school_id', 'id');
    }

    public function updateYearlyPackages(){
        if(!$this->currentAcademicYear) return;
        
        $academicDays = $this->currentAcademicYear->academicDays;

        $yearlyPackages = $this->yearlyPackages;

        foreach ($yearlyPackages as $package) {
            $package->update(['days' => $academicDays]);
        }
    }
}
