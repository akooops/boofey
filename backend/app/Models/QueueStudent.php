<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QueueStudent extends Model
{
    use HasFactory;

    public function queue()
    {
        return $this->belongsTo(Queue::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
