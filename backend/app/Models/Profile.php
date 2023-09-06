<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $appends = ["fullname"];

    protected $fillable = [
        'firstname',
        'lastname',
        'description',
        'image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFullnameAttribute()
    {
        return $this->firstname . ' ' . $this->lastname;
    }
}