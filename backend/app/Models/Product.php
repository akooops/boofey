<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $appends = ["currentPrice"];

    protected $fillable = [
        'name',
        'name_ar',
        'description',
        'description_ar',
        'sale_price',
        'price',
        'category_id',
        'file_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function image()
    {
        return $this->hasOne(File::class, 'id', 'file_id')->withDefault([
            'path' => 'products',
            'current_name' => 'default.png',
        ]);
    }

    function getCurrentPriceAttribute() {  
        return ($this->sale_price === null || $this->sale_price == 0) ? $this->price : $this->sale_price;
    }
}
