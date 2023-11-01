<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'username' => fake()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => '05' . fake()->numberBetween(10000000, 99999999),
            'phone_verified_at' => fake()->boolean(75) ? now() : null,
            'password' => Hash::make('ilyes123456'),
            'remember_token' => Str::random(10),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (\App\Models\User $user) {
            // Create a profile for each user after creating the user
            \App\Models\Profile::factory()->create(['user_id' => $user->id]);

            $role = fake()->boolean(75) ? 'parent' : 'admin';

            if ($role === 'parent') {
                $parentRole = Role::findByName('parent');
                $user->assignRole($parentRole);
            }
        
            if ($role === 'admin') {
                $adminRole = Role::findByName('admin');
                $user->assignRole($adminRole);
            }
        });
    }
}
