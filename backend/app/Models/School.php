<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'file_id',
    ];

    public function logo()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }
}
