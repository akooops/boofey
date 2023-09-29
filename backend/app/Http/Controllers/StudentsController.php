<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Requests\Students\StoreStudentRequest;
use App\Http\Requests\Students\UpdateStudentRequest;
use App\Models\AcademicYear;
use App\Models\Father;
use App\Models\File;
use App\Models\School;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;
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
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $studentsQuery = Student::latest()->where([
            'father_id' => $father->id
        ])->with([
            'image:id,path,current_name', 
            'academicYear:id,name,from,to,current',
            'school:id,name,file_id',
            'school.logo:id,current_name,path'
        ]);
        

        if ($search) {
            $studentsQuery->where(function ($query) use ($search) {
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

        $students = $studentsQuery->paginate($perPage, ['*'], 'page', $page);


        $response = [
            'status' => 'success',
            'data' => [
                'students' => $students->makeHidden(['otp', 'otp_expires_at']),
            ],
            'pagination' => handlePagination($students),
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
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        $schoolId = $request->get('school_id');
        $school = School::findOrFail($schoolId);

        $file = uploadFile($request->file('file'), 'students');

        $student = Student::create(array_merge(
            $request->validated(),
            [
                'school_id' => $school->id,
                'father_id' => $father->id,
                'file_id' => $file->id
            ]
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
    public function show(Student $student) 
    {        
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }
        
        $student->load([
            'image:id,path,current_name', 
            'academicYear:id,name,from,to,current',
            'school:id,name,file_id',
            'school.logo:id,current_name,path'
        ]);

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
    public function update(Student $student, UpdateStudentRequest $request) 
    {
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
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

    public function otp(Student $student) 
    {
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }

        $otp = null;

        do {
            $otp = Str::random(16);
        
            $studentWithOtpCode = Student::where('otp', $otp)->first();
        } while ($studentWithOtpCode != null);

        $otpExpiresAt = now()->addMinutes(10);

        $student->update(['otp' => $otp, 'otp_expires_at' => $otpExpiresAt]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'otp' => $otp
            ]
        ]);
    }

    /**
     * Delete student data
     * 
     * @param Student $student
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student) 
    {
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }

        $file = File::find($student->file_id);

        $student->delete();

        removeFile($file);

        return response()->json([
            'status' => 'success'
        ]);
    }
}