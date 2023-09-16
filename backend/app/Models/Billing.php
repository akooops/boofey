<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'address',
        'country',
        'state',
        'zipcode',
        'father_id',
    ];

    public function father()
    {
        return $this->belongsTo(Father::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'billing_id', 'id');
    }
}
