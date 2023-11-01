<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Profile extends Model
{
    use HasFactory;

    protected $appends = ['fullname'];

    protected $fillable = [
        'firstname',
        'lastname',
        'description',
        'file_id',
    ];

    public function image()
    {
        return $this->hasOne(File::class, 'id', 'file_id')->withDefault([
            'path' => 'profiles',
            'current_name' => 'default.png',
        ]);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFullnameAttribute()
    {
        return $this->firstname . ' ' . $this->lastname;
    }
}