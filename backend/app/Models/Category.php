<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $appends = ["productsCount"];

    protected $fillable = [
        'name',
        'name_ar',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }

    function getProductsCountAttribute() {  
        return $this->products()->count();
    }
}
