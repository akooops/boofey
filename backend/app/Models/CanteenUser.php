<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CanteenUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'canteen_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function canteen()
    {
        return $this->belongsTo(Canteen::class);
    }
}
