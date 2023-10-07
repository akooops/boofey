<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $appends = ["currentPrice", 'display_name', 'description_ar'];

    protected $fillable = [
        'name',
        'name_ar',
        'description',
        'description_ar',
        'sale_price',
        'price',
        'days',
        'yearly',
        'popular',
        'school_id',
        'tax',
        'hiddent',
        'code'
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function packageFeatures()
    {
        return $this->hasMany(PackageFeature::class, 'package_id', 'id');
    }

    public function syncPackageFeatures($features)
    {
        $this->packageFeatures()->sync($features);
    }

    public function storePackagesFeatures($features)
    {
        if(is_string($features) && json_decode($features) !== null) {
            $features = json_decode($features, true);
        }

        $this->packageFeatures()->createMany($features);
    }

    public function updatePackagesFeatures($features)
    {
        if(is_string($features) && json_decode($features) !== null) {
            $features = json_decode($features, true);
        }

        $this->packageFeatures()->delete();
        $this->storePackagesFeatures($features);
    }

    public function updateDays($days){
        $this->update(['days' => $days]);
    }

    public function subcriptions(){
        return $this->hasMany(Subscription::class, 'package_id', 'id');
    }

    function getCurrentPriceAttribute() {  
        return ($this->sale_price === null || $this->sale_price == 0) ? $this->price : $this->sale_price;
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

    public function getDisplayDescriptionAttribute(){
        if (session()->has('local')) {
            $local = session('local');

            if ($local === 'ar') {
                return $this->description_ar;
            }
        }

        return $this->description;
    }
}
