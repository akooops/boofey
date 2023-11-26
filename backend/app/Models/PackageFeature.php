<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_ar',
        'checked',
        'package_id',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}
