<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Father extends Model
{
    use HasFactory;

    protected $appends = ["childrenCount"];

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

    public function payments(){
        return $this->hasMany(Payment::class, 'father_id', 'id');
    }

    public function paymentMethods(){
        return $this->hasMany(PaymentMethod::class, 'father_id', 'id');
    }

    public function invoices(){
        return $this->hasMany(Invoice::class, 'father_id', 'id');
    }

    public function billings(){
        return $this->hasMany(Billing::class, 'father_id', 'id');
    }

    function getChildrenCountAttribute() {  

        return $this->students()->count();
    }
}
