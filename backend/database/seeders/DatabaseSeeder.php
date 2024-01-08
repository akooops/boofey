<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Coupon;
use App\Models\Package;
use App\Models\Profile;
use App\Models\Student;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        /*
        \App\Models\User::factory(200)->create();
        \App\Models\School::factory(85)->create();
        \App\Models\Canteen::factory(450)->create();
        \App\Models\Package::factory(500)->create();
        \App\Models\AcademicYear::factory(200)->create();
        \App\Models\Coupon::factory(100)->create();
        \App\Models\Student::factory(1000)->create();
        \App\Models\Category::factory(25)->create();
        \App\Models\Product::factory(227)->create();
        */

        //$this->seedSubs(5);

        $role = Role::create([
            'name' => 'technical_support',
            'guard_name' => 'web'
        ]);

        $role->save();

        $permissions = Permission::all();

        $role->syncPermissions($permissions);

        $user = User::create([
            'username' => 'akoops',
            'email' => 'support@akoops.com',
            'phone' => '0665797365',
            'phone_verified_at' => now(),
            'password' => 'ilyes123456' 
        ]);

        $user->save();

        $profile = Profile::create([
            'user_id' => $user->id,
            'firstname' => 'Ilyes',
            'lastname' => 'Azzi'
        ]);

        $profile->save();
    }

    private function seedSubs($toSeed){
        for($i = 0; $i < $toSeed; $i++){
            $student = Student::inRandomOrder()->first();
            $package = Package::inRandomOrder()->where('school_id', $student->school_id)->first();
    
            if($package == null) return null;
    
            $typeOfSub = rand(0, 3);
    
            $subscription = Subscription::create([
                'discount' => 0
            ]);
            $subscription->applyTax(fake()->numberBetween(0, 25));
            $subscription->applyPackage($package);
    
            if($typeOfSub == 0){
                $subscriptions = Subscription::where('student_id', $student->id)
                    ->whereIn('status', ['active', 'inactive']);
    
                if($subscriptions->count() < 1){
                    $subscription->status = 'active';
                    $subscription->started_at = now();
                    $subscription->initiated_at = now();
                    $subscription->exclude_from_calculation = false;
                    $subscription->student_id = $student->id;
                }else{
                    $subscription->status = 'disabled';
                    $subscription->initiated_at = fake()->dateTimeThisYear();
                    $subscription->exclude_from_calculation = true;
                    $subscription->student_id = $student->id;
                }
            }else if($typeOfSub == 1){
                $subscriptions = Subscription::where('student_id', $student->id)
                    ->whereIn('status', ['active', 'inactive']);
    
                if($subscriptions->count() < 1){
                    $subscription->status = 'inactive';
                    $subscription->initiated_at = now();
                    $subscription->exclude_from_calculation = false;
                    $subscription->student_id = $student->id;
                }else{
                    $subscription->status = 'disabled';
                    $subscription->initiated_at = fake()->dateTimeThisYear();
                    $subscription->exclude_from_calculation = true;
                    $subscription->student_id = $student->id;
                }
            }else if($typeOfSub == 2){
                $subscription->status = 'expired';
                $subscription->balance = 0;
                $subscription->initiated_at = now()->subMonth();
                $subscription->started_at = now()->subMonth();
                $subscription->expired_at = now();
                $subscription->exclude_from_calculation = false;
                $subscription->student_id = $student->id;
            }else {
                $subscription->status = 'disabled';
                $subscription->initiated_at = fake()->dateTimeThisYear();
                $subscription->exclude_from_calculation = true;
                $subscription->student_id = $student->id;
            }
    
            $discount = rand(0,2);
    
            if($discount == 0)
                $subscription->applyDiscount(fake()->numberBetween(0, 25));
            else if($discount == 1){
                $coupon = Coupon::inRandomOrder()->value('id');
                $subscription->applyCoupon($coupon);
            }
            else
                $subscription->applyDiscount(null);
    
            $subscription->calculateTotal();
            $subscription->save();
    
            $subscription->generateInvoice();
        }
    }
}
