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
        //\App\Models\User::factory(2)->create();
        //\App\Models\School::factory(2)->create();
        //\App\Models\Canteen::factory(2)->create();
        //\App\Models\Package::factory(2)->create();
        //\App\Models\AcademicYear::factory(5)->create();
        //\App\Models\Coupon::factory(5)->create();
        //\App\Models\Father::factory(5)->create();
        //\App\Models\Student::factory(2)->create();
        \App\Models\Category::factory(5)->create();
        \App\Models\Product::factory(10)->create();
    }
}
