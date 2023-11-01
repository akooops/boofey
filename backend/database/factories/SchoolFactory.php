<?php

namespace Database\Factories;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class SchoolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->text(6);
        return [
            'name' => 'School '.$name,
            'name_ar' => 'المدرسة '.$name,
        ];
    }

    
    public function configure()
    {
        return $this->afterCreating(function (\App\Models\School $school) {
            $basePath = public_path('uploads') . '/' . 'schools';

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
                'path' => 'schools',
            ]); 

            $school->createDefaulAcademicYear();
            $school->file_id = $file->id;
            $school->save();
        });
    }
}
