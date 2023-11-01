<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\File;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake()->text(6);
        $description = fake()->text(100);
        $price =  fake()->randomFloat(2, 25, 100);
        $num = fake()->numberBetween(0, 100);

        return [
            'name' => 'Product '.$name . ' ' .$num,
            'name_ar' => 'المنتج '.$name. ' ' .$num,
            'description' => 'Product '.$description,
            'description_ar' => 'المنتج '.$description,
            'price' => $price,
            'sale_price' => fake()->boolean(75) ? $price - 10 : null,
        ];
    }

    
    public function configure()
    {
        return $this->afterCreating(function (\App\Models\Product $product) {
            $randomCategoryId = Category::inRandomOrder()->value('id');

            $product->category_id = $randomCategoryId;
            $product->file_id = $this->createImage();
            $product->save();
        });
    }

    private function createImage(){
        $basePath = public_path('uploads') . '/' . 'products';

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
            'path' => 'products',
        ]); 

        return $file->id;  
    }
}
