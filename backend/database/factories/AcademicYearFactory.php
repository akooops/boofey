<?php

namespace Database\Factories;

use App\Models\File;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

class AcademicYearFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->text(6);
        
        $from = Carbon::parse(fake()->dateTimeThisYear());

        $fromFormatted = $from->format('Y-m-d');
        $to = $from->addMonths(9);

        $to = $to->format('Y-m-d');

        return [
            'name' => 'AcademicYear '.$name,
            'from' => $fromFormatted,
            'to' => $to,
            'current' => 0
        ];
    }

    
    public function configure()
    {
        return $this->afterCreating(function (\App\Models\AcademicYear $academicYear) {
            $randomSchool = School::inRandomOrder()->first();

            $current = 0;

            if($randomSchool->currentAcademicYear === null){
                $current = 1;
            }

            $academicYear->current = $current;
            $academicYear->school_id = $randomSchool->id;
            $academicYear->save();
        });
    }
}
