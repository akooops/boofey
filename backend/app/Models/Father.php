<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Father extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'father_id', 'id');
    }
}
