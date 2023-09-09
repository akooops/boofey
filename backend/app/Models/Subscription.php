<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $appends = ["expired"];

    protected $fillable = [
        'days',
        'balance',
        'should_start_at',
        'started_at',
        'payment_id',
        'student_id'
    ];

    public function payment()
    {
        return $this->hasOne(File::class, 'id', 'payment_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    
    public function getExpiredAttribute(){
        return ($this->balance > 0 && $this->started_at != null) ? false : true;
    }
}
