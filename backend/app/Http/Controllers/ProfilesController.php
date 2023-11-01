<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Requests\Students\StoreStudentRequest;
use App\Http\Requests\Profiles\UpdateProfileRequest;
use App\Http\Requests\Users\PasswordResetRequest;
use App\Models\AcademicYear;
use App\Models\Father;
use App\Models\File;
use App\Models\School;
use App\Models\User;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ProfilesController extends Controller
{
    public function show() 
    {        
        $user = Auth::user();
        $user = User::findOrFail($user->id);

        $user->load([
            'profile:id,firstname,lastname,description,user_id,file_id',
            'profile.image:id,current_name,path',
            'roles:id,name'
        ]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $user
            ]
        ]);
    }

    /**
     * Update student data
     * 
     * @param Student $student
     * @param UpdateStudentRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProfileRequest $request) 
    {
        $user = Auth::user();
        $user = User::findOrFail($user->id);

        $file = File::find($user->profile->file_id);

        if($request->file('file')) {
            removeFile($file);

            $file = uploadFile($request->file('file'), 'profiles');
        }

        $user->profile->update(array_merge(
            $request->validated(),
            [
                'file_id' => ($file === null) ? null : $file->id,
                'description' => ($request->has('description') || $request->input('description') != null) ? $request->input('description') : NULL,
            ]
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function passwordReset(PasswordResetRequest $request)
    {
        $user = Auth::user();
        $user = User::findOrFail($user->id);

        // Validate the old password
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'old_password' =>[
                        __('translations.incorrect_old_password')
                    ] 
                ],
            ], 422);
        }
        
        $user->update([
            'password' => $request->password,
        ]);

        return response()->json([
            'status' => 'success'
        ]);
    }
}