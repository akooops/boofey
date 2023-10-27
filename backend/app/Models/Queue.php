<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;

    public $dates = ['started_at', 'closed_at'];

    protected $appends = ["closed", 'studentsPlucked', 'studentsCount', 'studentsInCount', 'studentsExitedCount', 'lastSyncedAt'];

    protected $fillable = [
        'type',
        'started_at',
        'closed_at',
        'canteen_id',
    ];

    public function canteen()
    {
        return $this->belongsTo(Canteen::class);
    }

    public function queueStudents()
    {
        return $this->hasMany(QueueStudent::class, 'queue_id', 'id');
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'queue_students', 'queue_id', 'student_id');
    }

    public function getStudentsPluckedAttribute()
    {
        return $this->students()->select('student.id');
    }

    public function getClosedAttribute(){
        return ($this->closed_at === null) ? false : true;
    }

    public function getStudentsCountAttribute(){
        return $this->students()->count();
    }

    public function getStudentsExitedCountAttribute(){
        return $this->students()->whereNot('exited_at', NULL)->count();
    }

    public function getStudentsInCountAttribute(){
        return $this->studentsCount - $this->studentsExitedCount;
    }

    public function getLastSyncedAtAttribute(){
        return $this->students()->max('synced_at');
    }
}
