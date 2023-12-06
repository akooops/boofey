<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsedCoupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'father_id',
        'coupon_id'
    ];
        
    /* Relationships
        --------------------------------------------------------------------
    */

    public function father()
    {
        return $this->belongsTo(Father::class);
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }
        
    /* Methods
        --------------------------------------------------------------------
    */
}
