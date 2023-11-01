<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->text(15);

        $max = rand(5, 1000);

        return [
            'name' => $name,
            'code' => 'cpn-'.fake()->numberBetween(0, 100).$name,
            'discount' => fake()->numberBetween(5, 25),
            'used' => fake()->numberBetween(0, $max),
            'max' => $max,
            'onhold' => fake()->boolean(50) ? true : false,
        ];
    }
}
