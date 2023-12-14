<?php

use App\Models\Father;
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
    ])->withoutVerifying();

    $result = $response->json();

    if (isset($result['error'])) {
        return [
            'status' => 'error',
        ];
    } else {
        $father = Father::where('identity_number', $identity_number)->first();

        if(is_null($father)){
            $username = strtolower($result->SuperiorName.' '.$result->SuperiorID);
            $username = str_replace(' ', '_', $username);

            $phone = $result->SMSNumber;

            if (preg_match('/^(\+96605\d{8})$/', $phone, $matches)) {
                $desiredPart = $matches[1];
                $phone = $desiredPart; 
            }

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