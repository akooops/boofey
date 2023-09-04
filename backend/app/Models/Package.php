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

    public function storePackagesFeatures(array $features)
    {
        $this->packageFeatures()->createMany($features);
    }

    public function updatePackagesFeatures(array $features)
    {
        $featureIds = collect($features)->pluck('id')->filter();

        $this->packageFeatures()->whereIn('id', $featureIds)->update($features);

        $newFeatures = collect($features)->filter(function ($feature) {
            return (!isset($feature['id']) || $feature['id'] == null);
        });

        $this->packageFeatures()->createMany($newFeatures);

        $this->packageFeatures()->whereNotIn('id', $featureIds)->delete();
    }

    function getCurrentPriceAttribute() {  
        return ($this->sale_price == null || $this->sale_price == 0) ? $this->price : $this->sale_price;
    }
}
