<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $appends = ["expired", 'status'];

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
        return $this->hasOne(Payment::class, 'id', 'payment_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    
    public function getExpiredAttribute(){
        if(
            ($this->balance > 0 && $this->started_at != null) || 
            ($this->balance > 0 && $this->started_at == null)
        ) return false;
        
        return true;
    }

    public function getStatusAttribute(){
        if($this->balance > 0 && $this->started_at != null) return 0;
        elseif($this->balance > 0 && $this->started_at == null) return 1;
        elseif($this->balance <= 0 && $this->started_at == null) return 2;
        
        return 2;
    }
}
