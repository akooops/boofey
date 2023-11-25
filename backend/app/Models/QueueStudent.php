<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QueueStudent extends Model
{
    use HasFactory;

    public $dates = ['started_at', 'exited_at'];

    protected $casts = [
        'started_at' => 'datetime:Y-m-d H:i:s',
        'exited_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $fillable = [
        'started_at',
        'synced_at',
        'exited_at',
        'queue_id',
        'student_id',
    ];
    
    public function queue()
    {
        return $this->belongsTo(Queue::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
