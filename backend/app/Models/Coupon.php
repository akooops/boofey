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
        'expire_at'
    ];

    function getExpiredhAttribute() {
        $today = Carbon::now()->startOfDay();
        $expire_at = Carbon::parse($this->expire_at)->startOfDay();

        return (   $this->used >= $this->max
                || $this->onhold == true
                || $today > $expire_at 
            ) ? true : false;
    }
}
