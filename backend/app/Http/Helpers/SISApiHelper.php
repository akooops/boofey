<?php

use App\Models\Billing;
use App\Models\Division;
use App\Models\Father;
use App\Models\School;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

function registerFather($identity_number){
    $apiUrl = 'https://ds.sis.edu.sa/BoofeyParent.php';
    $apiKey = '0506da243a5b435b8f56b5b8ce4efd75';

    $response = Http::get($apiUrl, [
        'api_key' => $apiKey,
        'SuperiorNationalityNumber' => $identity_number,
    ]);

    $result = (object)$response->json();

    if (isset($result->error)) {
        return [
            'status' => 'error',
        ];
    } else {
        $father = Father::where('identity_number', $identity_number)->first();

        if(is_null($father)){
            $username = strtolower($result->SuperiorName.' '.$result->SuperiorID);
            $username = str_replace(' ', '_', $username);

            $phone = '0'.substr($result->SMSNumber, 4);

            $user = User::create([
                'username' => $username,
                'email' => $result->Email,
                'phone' => $phone,
                'phone_verified_at' => now(),
                'password' => Str::random(8)
            ]);

            $user->save();

            $parentRole = Role::where('name', 'parent')->first();
            if($parentRole === null){
                $parentRole = Role::create([
                    'name' => 'parent'
                ]);
    
                $parentRole->save();
            }
    
            $user->syncRoles($parentRole->id);
    
            $user->profile()->create([
                'firstname' => $result->SuperiorName,
                'lastname' => '',
            ]);
    
            $father = Father::create([
                'user_id' => $user->id,
                'identity_number' => $identity_number
            ]);
    
            $father->save();

            $billing = Billing::create([
                'firstname' => $result->SuperiorName,
                'lastname' => '',
                'email' => $result->Email,
                'phone' => $phone,
                'address' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'state' => 'Riyadh',
                'city' => 'Riyadh',
                'zipcode' => '00000',
                'father_id' => $father->id
            ]);

            $billing->save();

            registerStudents($result->SuperiorID, $father);

            return [
                'status' => 'success',
                'data' => [
                    'user' => $user,
                ]
            ];
        }else{
            $user = User::findOrFail($father->user_id);

            $username = strtolower($result->SuperiorName.' '.$result->SuperiorID);
            $username = str_replace(' ', '_', $username);

            $phone = '0'.substr($result->SMSNumber, 4);

            $user->update([
                'username' => $username,
                'email' => $result->Email,
                'phone' => $phone,
            ]);

            registerStudents($result->SuperiorID, $father);

            return [
                'status' => 'success',
                'data' => [
                    'user' => $user,
                ]
            ];
        }
    }
}

function registerStudents($SuperiorID, $father){
    $apiUrl = 'https://ds.sis.edu.sa/BoofeyStudent.php';
    $apiKey = '0506da243a5b435b8f56b5b8ce4efd75';

    $response = Http::get($apiUrl, [
        'api_key' => $apiKey,
        'SuperiorID' => $SuperiorID,
    ]);

    $result = (object)$response->json();

    if (isset($result->error)) {
        return [
            'status' => 'error',
        ];
    }else{
        $sis = School::where('code', 'sis')->first();
        if(is_null($sis)) {
            $sis = School::create([
                'name' => 'Saudi International Schools',
                'name_ar' =>'مدارس سعود العالمية',
                'code' => 'sis'
            ]);

            $sis->save();
        };

        foreach($result as $student){
            $student = (object)$student;

            $division = Division::where('name', $student->SchoolName)->first();
 
            if(!$division) {
                $division = Division::create([
                    'name' => $student->SchoolName,
                    'name_ar' => $student->SchoolName,
                    'school_id' => $sis->id
                ]);

                $division->save();
            };

            preg_match('/\d+/', $student->EnglishGradeName, $matches);
            $grade = null;

            if (!empty($matches)) {
                $number = $matches[0];
                
                $grade = $number - 1;
            } else {
                $grade = 0;
            }

            $checkIfStudent = Student::where('sis_number', $student->StudentNumber)->first();

            if($checkIfStudent == null){
                $student = Student::create([
                    'firstname' => $student->EnglishFirstName.' '.$student->EnglishSecondName,
                    'lastname' => $student->EnglishLastName,
                    'class' => $grade,
                    'father_id' => $father->id,
                    'school_id' => $sis->id,
                    'academic_year_id' => $sis->currentAcademicYear->id ?? null,
                    'sis_number' => $student->StudentNumber,
                    'division_id' => $division->id
                ]);
    
                $student->save();
            }else{
                $checkIfStudent->update([
                    'firstname' => $student->EnglishFirstName.' '.$student->EnglishSecondName,
                    'lastname' => $student->EnglishLastName,
                    'class' => $grade,
                ]);
            }
        }
    }
}

function notifyParent($father, $student){
    $apiUrl = 'https://ds.sis.edu.sa/BoofeyUpload.php';
    $apiKey = 'hM9C75UfR5IaBF5c2Qs2RxiAed3DUNHE6nlnXcZGdAz6Kc0yjKl3xPfZ3322';

    $response = Http::get($apiUrl, [
        'api_key' => $apiKey,
        'phone' => "+966" . substr($father->user->phone, 1),
        'parentName' => $father->user->profile->fullname,
        'studentName' => $student->fullname,
    ]);

    $result = (object)$response->json();

    if (isset($result->error)) {
        return [
            'status' => 'error',
        ];
    }else{
        return [
            'status' => 'success',
        ];
    }
}

