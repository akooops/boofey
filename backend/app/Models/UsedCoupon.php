<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsedCoupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'coupon_id'
    ];
        
    /* Relationships
        --------------------------------------------------------------------
    */

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }
        
    /* Methods
        --------------------------------------------------------------------
    */
}
