<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $appends = ["expired"];

    protected $fillable = [
        'name',
        'code',
        'discount',
        'used',
        'max',
        'onhold',
    ];

    /* Relationships
        --------------------------------------------------------------------
    */

    public function couponUsages()
    {
        return $this->hasMany(UsedCoupon::class);
    }

    /* Appends
        --------------------------------------------------------------------
    */

    function getExpiredAttribute() {
        return ($this->used >= $this->max || $this->onhold == true) ? true : false;
    }
}
