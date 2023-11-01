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
        \App\Models\User::factory(200)->create();
        \App\Models\School::factory(85)->create();
        \App\Models\Canteen::factory(450)->create();
        \App\Models\Package::factory(500)->create();
        \App\Models\AcademicYear::factory(200)->create();
        \App\Models\Coupon::factory(100)->create();
        \App\Models\Student::factory(1000)->create();
        \App\Models\Category::factory(25)->create();
        \App\Models\Product::factory(227)->create();
    }
}
