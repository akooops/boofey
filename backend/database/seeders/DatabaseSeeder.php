<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(2)->create();
        \App\Models\School::factory(2)->create();
        \App\Models\Canteen::factory(2)->create();
        \App\Models\Package::factory(2)->create();
        \App\Models\AcademicYear::factory(5)->create();
    }
}
