<?php

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\Father;
use App\Models\File;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'firstname' => fake()->firstName(),
            'lastname' => fake()->lastName(),
            'class' => fake()->numberBetween(0, 11),
            'onhold' => fake()->boolean(10) ? true : false,
        ];
    }

    
    public function configure()
    {
        return $this->afterCreating(function (\App\Models\Student $student) {
            $randomSchool = School::inRandomOrder()->first();
            $randomAcademicYear = AcademicYear::where('school_id', $randomSchool->id)->inRandomOrder()->first();

            $archived = true;

            if($randomSchool->currentAcademicYear != null && $randomAcademicYear != null)
                $archived = ($randomSchool->currentAcademicYear->id == $randomAcademicYear->id) ? false : true;

            $randomFatherId = Father::inRandomOrder()->value('id');

            $student->academic_year_id = $randomAcademicYear->id;
            $student->father_id = $randomFatherId;
            $student->school_id = $randomSchool->id;
            $student->archived = $archived;
            $student->file_id = $this->createImage();
            $student->save();
        });
    }

    private function createImage(){
        $basePath = public_path('uploads') . '/' . 'students';

        if (!\Illuminate\Support\Facades\File::isDirectory($basePath)) {
            \Illuminate\Support\Facades\File::makeDirectory($basePath, 0755, true);
        }

        $sourceImages = \Illuminate\Support\Facades\File::files($basePath);

        $selectedImage = Arr::random($sourceImages);

        $newFilename = 'fake_image_' . Str::random(10) . '.jpg';

        $fakeImagePath = $basePath . '/' . $newFilename;
        \Illuminate\Support\Facades\File::copy($selectedImage, $fakeImagePath);

        $file = File::create([
            'current_name' => $newFilename,
            'original_name' => $newFilename,
            'path' => 'students',
        ]); 

        return $file->id;  
    }
}
