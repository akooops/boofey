<?php

namespace Database\Factories;

use App\Models\File;
use App\Models\PackageFeature;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->text(6);
        $description = fake()->text(100);
        $price =  fake()->randomFloat(2, 25, 100);

        return [
            'name' => 'Package '.$name,
            'name_ar' => 'الباقة '.$name,
            'description' => 'Package '.$description,
            'description_ar' => 'الباقة '.$description,
            'price' => $price,
            'sale_price' => fake()->boolean(75) ? $price - 10 : null,
            'tax' => fake()->numberBetween(0, 25),
            'days' => fake()->numberBetween(10, 365),
            'yearly' => fake()->boolean(50) ? true : false,
            'yearly' => fake()->boolean(50) ? true : false,
            'yearly' => fake()->boolean(50) ? true : false,
            'code' => 'pcg'.$name,
        ];
    }

    
    public function configure()
    {
        return $this->afterCreating(function (\App\Models\Package $package) {
            $randomSchoolId = School::inRandomOrder()->value('id');

            $packageFeature = PackageFeature::create([
                'package_id' => $package->id,
                'name' => fake()->text(6),
                'name_ar' => fake()->text(6),
                'checked' => fake()->boolean(75) ? true : false,
            ]);

            $packageFeature->save();

            $package->school_id = $randomSchoolId;
            $package->save();
        });
    }
}
