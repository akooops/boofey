<?php

namespace Database\Factories;

use App\Models\File;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class CanteenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->text(6);
        $address = fake()->address();

        return [
            'name' => 'Canteen '.$name,
            'name_ar' => 'المطعم '.$name,
            'address' => 'Canteen '.$address,
            'address_ar' => 'المطعم '.$address,
        ];
    }

    
    public function configure()
    {
        return $this->afterCreating(function (\App\Models\Canteen $canteen) {
            $randomSchoolId = School::inRandomOrder()->value('id');

            $canteen->school_id = $randomSchoolId;
            $canteen->save();
        });
    }
}
