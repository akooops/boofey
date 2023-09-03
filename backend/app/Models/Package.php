<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $appends = ["currentPrice"];

    protected $fillable = [
        'name',
        'description',
        'sale_price',
        'price',
        'days',
        'yearly',
        'popular',
        'school_id',
    ];

    public function packageFeatures()
    {
        return $this->hasMany(PackageFeature::class, 'package_id', 'id');
    }

    function getCurrentPriceAttribute() {  
        return ($this->sale_price == null || $this->sale_price == 0) ? $this->price : $this->sale_price;
    }
}
