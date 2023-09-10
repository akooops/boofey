<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;

    protected $appends = ["closed"];

    public function canteen()
    {
        return $this->belongsTo(Canteen::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'queue_students', 'queue_id', 'student_id');
    }

    public function getClosedAttribute(){
        return ($this->closed_at == null) ? false : true;
    }
}
