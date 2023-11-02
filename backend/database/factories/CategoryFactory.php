<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->text(10);
        $num = fake()->numberBetween(0, 1000);

        return [
            'name' => 'Category '.$name.' '.$num,
            'name_ar' => 'صنف '.$name.' '.$num,
        ];
    }
}
