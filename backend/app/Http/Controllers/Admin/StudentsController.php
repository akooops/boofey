<?php

namespace App\Http\Controllers\Admin;

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
        if ($request->has('school')) {
            $schoolId = $request->query('school');
            $school = School::findOrFail($schoolId);
    
            return $this->indexBySchool($school, $request);
        }

        $students = $this->getStudentsQuery($request);

        $response = [
            'status' => 'success',
            'data' => [
                'students' => $students->makeHidden(['otp', 'otp_expires_at']),
            ],
            'pagination' => handlePagination($students),
        ];

        return response()->json($response);
    }

    public function indexBySchool(School $school, Request $request)
    {
        $school->load([
            'logo:id,current_name,path'
        ]);

        $students = $this->getStudentsQuery($request, $school);

        $response = [
            'status' => 'success',
            'data' => [
                'students' => $students->makeHidden(['otp', 'otp_expires_at']),
                'school' => $school->makeHidden(['created_at', 'updated_at']),
            ],
            'pagination' => handlePagination($students),
        ];

        return response()->json($response);
    }

    public function getStudentsQuery(Request $request, School $school = null)
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));
        $archived = $request->query('archived', null);
        $subscribed = $request->query('subscribed', null);

        $studentsQuery = Student::orderBy('id', 'DESC')->with([
            'image:id,path,current_name', 
            'academicYear:id,name,from,to,current',
            'father:id,user_id',
            'father.user:id,username,email,phone',
            'father.user.profile:id,user_id,firstname,lastname',
            'father.user.profile.image:id,current_name,path',
        ]);

        if ($school) {
            $studentsQuery->where('school_id', $school->id);
        }else{
            $studentsQuery->with([
                'school:id,name,file_id',
                'school.logo:id,current_name,path'
            ]); 
        }

        if ($search) {
            $studentsQuery->where(function ($query) use ($search) {
                $query
                    ->where('id', $search)
                    ->orWhere('firstname', 'like', '%' . $search . '%')
                    ->orWhere('lastname', 'like', '%' . $search . '%')
                    ->orWhereRaw("CONCAT(firstname, ' ', lastname) LIKE ?", ['%' . $search . '%'])
                    ->orWhereRaw("CONCAT(lastname, ' ', firstname) LIKE ?", ['%' . $search . '%'])
                    ->orWhere('nfc_id', 'like', '%' . $search . '%')
                    ->orWhere('face_id', 'like', '%' . $search . '%');
            })
            ->orWhereHas('school', function ($schoolQuery) use ($search) {
                $schoolQuery->where('name', 'like', '%' . $search . '%')
                ->orWhere('name_ar', 'like', '%' . $search . '%');
            })
            ->orWhereHas('father', function ($fatherQuery) use ($search) {
                $fatherQuery->where(function ($query) use ($search) {
                    $query->whereHas('user', function ($userQuery) use ($search) {
                            $userQuery->where('username', 'like', '%' . $search . '%')
                                ->orWhere('email', 'like', '%' . $search . '%')
                                ->orWhere('phone', 'like', '%' . $search . '%')
                                ->orWhereHas('profile', function ($profileQuery) use ($search) {
                                    $profileQuery->where('firstname', 'like', '%' . $search . '%')
                                        ->orWhere('lastname', 'like', '%' . $search . '%')                                                          
                                        ->orWhereRaw("CONCAT(firstname, ' ', lastname) LIKE ?", ['%' . $search . '%'])
                                        ->orWhereRaw("CONCAT(lastname, ' ', firstname) LIKE ?", ['%' . $search . '%']);
                                });
                        });
                });
            });
        }

        if(!is_null($archived)){
            $studentsQuery->where('archived', $archived);
        }

        if(!is_null($subscribed)){
            $studentsQuery = ($subscribed == true) ? $studentsQuery->whereHas('activeSubscription') : $studentsQuery->whereDoesntHave('activeSubscription');
        }
        
        return $studentsQuery->paginate($perPage, ['*'], 'page', $page);
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
        $schoolId = $request->get('school_id');
        $school = School::findOrFail($schoolId);

        $this->createStudent($request, $school);
    
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function storeBySchool(School $school, StoreStudentRequest $request) 
    {
        $this->createStudent($request, $school);
    
        return response()->json([
            'status' => 'success'
        ]);
    }

    private function createStudent($request, School $school = null) 
    {
        $archived = is_null($school->currentAcademicYear) ? true : ($school->currentAcademicYear->id == $request->input('academic_year_id') ? false : true);

        $file = uploadFile($request->file('file'), 'students');

        $student = Student::create(array_merge(
            $request->validated(),
            [
                'school_id' => $school->id,
                'file_id' => $file->id,
                'archived' => $archived
            ]
        ));

        $student->save();
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
        $file = File::find($student->file_id);

        if($request->file('file')) {
            removeFile($file);

            $file = uploadFile($request->file('file'), 'students');
        }

        $school = School::findOrFail($student->school_id);

        $archived = is_null($school->currentAcademicYear) ? true : ($school->currentAcademicYear->id == $request->input('academic_year_id') ? false : true);

        $student->update(array_merge(
            $request->validated(),
            [
                'file_id' => $file->id,
                'archived' => $archived
            ]
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function otp(Student $student) 
    {
        $otp = null;

        do {
            $otp = Str::random(16);
        
            $studentWithOtpCode = Student::where('otp', $otp)->first();
        } while ($studentWithOtpCode != null);

        $otpExpiresAt = now()->endOfDay();

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
        $file = File::find($student->file_id);

        $student->delete();

        removeFile($file);

        return response()->json([
            'status' => 'success'
        ]);
    }
}