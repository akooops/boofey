<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ckecked',
        'package_id',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}
