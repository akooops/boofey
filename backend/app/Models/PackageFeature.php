<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageFeature extends Model
{
    use HasFactory;

    protected $appends = ['display_name'];

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

    public function getDisplayNameAttribute(){
        if (session()->has('local')) {
            $local = session('local');

            if ($local === 'ar') {
                return $this->name_ar;
            }
        }

        return $this->name;
    }
}
