<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class AcademicYear extends Model
{
    use HasFactory;

    protected $appends = ["academicDays"];

    protected $fillable = [
        'name',
        'from',
        'to',
        'current',
        'school_id',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    
    public function academicBreaks()
    {
        return $this->hasMany(AcademicBreak::class, 'academic_year_id', 'id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'academic_year_id', 'id');
    }

    public function getAcademicDaysAttribute() {  
        $academicBreaks = $this->academicBreaks;

        $startDate = Carbon::parse($this->from);
        $endDate = Carbon::parse($this->to);   

        $totalDays = 0;
        $conflictedDays = [];

        foreach ($academicBreaks as $academicBreak) {
            $academicBreakFrom = Carbon::parse($academicBreak->from);
            $academicBreakTo = Carbon::parse($academicBreak->to);

            for ($date = $academicBreakFrom; $date->lte($academicBreakTo); $date->addDay()) {
                $dateString = $date->toDateString();

                if (!in_array($dateString, $conflictedDays)) {
                    $conflictedDays[] = $dateString;
                }
            }
        }

        for ($date = $startDate; $date->lte($endDate); $date->addDay()) {
            $currentDayOfWeek = $date->dayOfWeek;

            if (!in_array($currentDayOfWeek, [5, 6]) && !in_array($date->toDateString(), $conflictedDays)) {
                $totalDays++;
            }
        }

        return $totalDays;
    }
}
