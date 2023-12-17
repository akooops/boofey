<?php

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

            $position = strpos($result->SMSNumber, '96605') !== false ? strpos($result->SMSNumber, '96605') : strpos($result->SMSNumber, '9665');
            $phone = substr($result->SMSNumber, $position + strlen('96605'));

            //$phone = '0'.substr($result->SMSNumber, 4);
            //$phone = substr($result->SMSNumber, 4);

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

            registerStudents($result->SuperiorID, $father);

            return [
                'status' => 'success',
                'data' => [
                    'user' => $user,
                ]
            ];
        }else{
            $user = User::findOrFail($father->user_id);

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
        if(is_null($sis)) return;

        foreach($result as $student){
            $student = (object)$student;

            preg_match('/\d+/', $student->EnglishGradeName, $matches);
            $grade = null;

            if (!empty($matches)) {
                $number = $matches[0];
                
                $grade = $number;
            } else {
                $grade = 0;
            }

            $student = Student::create([
                'firstname' => $student->EnglishFirstName.' '.$student->EnglishSecondName,
                'lastname' => $student->EnglishLastName,
                'class' => $grade,
                'father_id' => $father->id,
                'school_id' => $sis->id,
                'academic_year_id' => $sis->currentAcademicYear->id ?? null,
            ]);

            $student->save();
        }
    }
}
