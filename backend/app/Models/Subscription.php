<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'days',
        'balance',
        'from',
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
}
