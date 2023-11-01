<?php

namespace Database\Factories;

use App\Models\File;
use App\Models\School;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class FatherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [

        ];
    }

    
    public function configure()
    {
        return $this->afterCreating(function (\App\Models\Father $father) {
            $usersNotInFather = User::leftJoin('fathers', 'users.id', '=', 'fathers.user_id')
                ->whereNull('fathers.user_id')
                ->select('users.*')
                ->pluck('id');

            $randomUser = User::whereIn('id', $usersNotInFather)->whereHas('roles', function ($query) {
                $query->where('name', 'parent');
            })->inRandomOrder()->first();

            $father->user_id = $randomUser->id;
            $father->save();
        });
    }
}
