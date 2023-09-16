<?php

namespace App\Http\Controllers\Api;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Requests\Students\StoreStudentRequest;
use App\Http\Requests\Students\UpdateStudentRequest;
use App\Models\AcademicYear;
use App\Models\Father;
use App\Models\File;
use App\Models\School;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Str;

class StudentsController extends Controller
{
    /**
     * Display all students
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $students = Student::latest()->with([
            'image:id,path,current_name', 
            'school:id,name,file_id',
            'school.logo:id,path,current_name',
            'father:id,user_id',
            'father.user:id',
            'father.user.profile:id,user_id,firstname,lastname',
            'father.user.profile.image:id,current_name,path',
        ]);

        if ($search) {
            $students->where(function ($query) use ($search) {
                $query->where('firstname', 'like', '%' . $search . '%')
                    ->orWhere('lastname', 'like', '%' . $search . '%')
                    ->orWhere('nfc_id', 'like', '%' . $search . '%')
                    ->orWhere('face_id', 'like', '%' . $search . '%');
            })
            ->orWhereHas('school', function ($schoolQuery) use ($search) {
                $schoolQuery->where('name', 'like', '%' . $search . '%');
            })
            ->orWhereHas('father', function ($fatherQuery) use ($search) {
                $fatherQuery->where(function ($query) use ($search) {
                    $query->whereHas('user', function ($userQuery) use ($search) {
                            $userQuery->where('username', 'like', '%' . $search . '%')
                                ->orWhere('email', 'like', '%' . $search . '%')
                                ->orWhere('phone', 'like', '%' . $search . '%')
                                ->orWhereHas('profile', function ($profileQuery) use ($search) {
                                    $profileQuery->where('firstname', 'like', '%' . $search . '%')
                                        ->orWhere('lastname', 'like', '%' . $search . '%');
                                });
                        });
                });
            });
        }

        $students = $students->paginate($perPage, ['*'], 'page', $page);
        $fathers = Father::get();
        $schools = School::get();
        $academicYears = AcademicYear::get();

        $response = [
            'status' => 'success',
            'data' => [
                'students' => $students->items(), 
                'fathers' => $fathers, 
                'schools' => $schools, 
                'academicYears' => $academicYears, 
            ],
            'pagination' => handlePagination($students)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created student
     * 
     * @param Student $student
     * @param StoreStudentRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStudentRequest $request) 
    {
        $file = uploadFile($request->file('file'), 'students');

        $student = Student::create(array_merge(
            $request->validated(),
            ['file_id' => $file->id]
        ));

        $student->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show student data
     * 
     * @param Student $student
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($id) 
    {
        $student = Student::with([
            'image:id,path,current_name', 
            'school:id,name',
            'academicYear:id,name,from,to'
        ])->find($id);

        if (!$student) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'student' => $student
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
    public function update($id, UpdateStudentRequest $request) 
    {
        $student = Student::find($id);
        
        if (!$student) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $file = File::find($student->file_id);

        if($request->file('file')) {
            removeFile($file);

            $file = uploadFile($request->file('file'), 'students');
        }

        $student->update(array_merge(
            $request->validated(),
            ['file_id' => $file->id]
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete student data
     * 
     * @param Student $student
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $file = File::find($student->file_id);

        $student->delete();

        removeFile($file);

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function otp($id) 
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $otp = null;

        do {
            $otp = Str::random(16);
        
            $studentWithOtpCode = Student::where('otp', $otp)->first();
        } while ($studentWithOtpCode);

        $otpExpiresAt = now()->addMinutes(10);

        $student->update(['otp' => $otp, 'otp_expires_at' => $otpExpiresAt]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'otp' => $otp
            ]
        ]);
    }
}