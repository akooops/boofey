<?php

namespace App\Http\Controllers;

use App\Http\Requests\Students\CheckStudentFaceRequest;
use App\Http\Requests\Students\CheckStudentSubscriptionRequest;
use App\Http\Requests\Students\OtpStudentRequest;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Requests\Students\StoreStudentRequest;
use App\Http\Requests\Students\UpdateStudentRequest;
use App\Http\Requests\Students\UploadStudentFaceRequest;
use App\Models\AcademicYear;
use App\Models\Father;
use App\Models\File;
use App\Models\School;
use Aws\S3\S3Client;
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
        $father = $request->get('father');

        $students = Student::orderBy('id', 'DESC')->where([
            'father_id' => $father->id
        ])->with([
            'image:id,path,current_name', 
            'school:id,name,name_ar,file_id',
            'school.logo:id,current_name,path'
        ])->get();
    


        $response = [
            'status' => 'success',
            'data' => [
                'students' => $students->makeHidden(['otp', 'otp_expires_at', 'activeSubscription']),
            ],
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
    /*
    public function store(StoreStudentRequest $request) 
    {
        $father = $request->get('father');

        $schoolId = $request->get('school_id');
        $school = School::findOrFail($schoolId);

        $file = uploadFile($request->file('file'), 'students');

        $face = uploadFace("{$file->path}/{$file->current_name}");
        
        if(!is_null($face['status']) && $face['status'] == 'many'){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'file' => [__('translations.many_face_detected')]
                ]
            ], 422);
        }

        if(!is_null($face['status']) && $face['status'] == 'indexed'){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'file' => [__('translations.face_already_indexed')]
                ]
            ], 422);
        }

        if(!is_null($face['status']) && $face['status'] == 'nothing'){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'file' => [__('translations.no_face_detected')]
                ]
            ], 422);
        }

        $student = Student::create(array_merge(
            $request->validated(),
            [
                'school_id' => $school->id,
                'father_id' => $father->id,
                'file_id' => $file->id,
                'face_id' => $face['faceId']
            ]
        ));

        $student->save();


        return response()->json([
            'status' => 'success'
        ]);
    }
    */

    /**
     * Show student data
     * 
     * @param Student $student
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student, Request $request) 
    {        
        $father = $request->get('father');

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
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
        $father = $request->get('father');

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
                ]
            ], 403);
        }

        $file = File::find($student->file_id);

        $face = null;

        if($request->file('file')) {
            $newFile = uploadFile($request->file('file'), 'students');

            $face = uploadFace("{$newFile->path}/{$newFile->current_name}", $student->face_id, $student);

            if(!is_null($face['status']) && $face['status'] == 'quality'){
                return response()->json([
                    'status' => 'error',
                    'errors' => [
                        'file' => [__('translations.poor_face_quality')]
                    ]
                ], 422);
            }

            if(!is_null($face['status']) && $face['status'] == 'many'){
                return response()->json([
                    'status' => 'error',
                    'errors' => [
                        'file' => [__('translations.many_face_detected')]
                    ]
                ], 422);
            }
    
            if(!is_null($face['status']) && $face['status'] == 'indexed'){
                return response()->json([
                    'status' => 'error',
                    'errors' => [
                        'file' => [__('translations.face_already_indexed')]
                    ]
                ], 422);
            }
    
            if(!is_null($face['status']) && $face['status'] == 'nothing'){
                return response()->json([
                    'status' => 'error',
                    'errors' => [
                        'file' => [__('translations.no_face_detected')]
                    ]
                ], 422);
            }

            removeFile($file);
            $file = $newFile;
        }
        
        $student->update([
            'file_id' => $file->id,
            'face_id' => $face['faceId']
        ]);

        /*
        $student->update(array_merge(
            $request->validated(),
            [
                'file_id' => $file->id,
                'face_id' => $face
            ]
        ));
        */

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function otp(Student $student, OtpStudentRequest $request) 
    {
        $father = $request->get('father');

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
                ]
            ], 403);
        }

        if($student->school->qr_enabled != true){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'otp' => [__('translations.qr_is_disabled')]
                ]
            ], 422);
        }

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

     /*
    public function destroy(Student $student, Request $request) 
    {
        $father = $request->get('father');

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
                ]
            ], 403);
        }

        if($student->subscribed){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '200' => __('translations.student_is_subscribed_on_delete')
                ]
            ], 200);
        }

        $file = File::find($student->file_id);

        if(!is_null($student->face_id)){
            removeFace($student->face_id);
        }

        $student->delete();

        removeFile($file);

        return response()->json([
            'status' => 'success'
        ]);
    }
    */

    public function uploadFace(UploadStudentFaceRequest $request){
        $student = Student::where('sis_number', $request->sis_number)->first();

        $s3ObjectBucket = $request->s3_object_bucket;
        $s3ObjectName = $request->s3_object_name;

        $result = uploadFaceByS3($s3ObjectBucket, $s3ObjectName);

        if ($result['status'] === 'error') {
            return response()->json($result, $result['code']);
        }

        $faceId = $result['details']['faceId'];

        if(
            Student::where('face_id', $faceId)->whereNot('id', $student->id)->exists()
        ){
            return response()->json([
                'status' => 'error',
                'code' => 700,
                'message' => 'Face data belongs to another student.',
                'details' => "We found that the face you are trying to index is assined to another student before."
            ], 700);
        }

        try {
            $s3 = new S3Client([
                'version' => 'latest',
                'region' => env('AWS_DEFAULT_REGION'),
                'credentials' => [
                    'key' => env('AWS_ACCESS_KEY_ID'),
                    'secret' => env('AWS_SECRET_ACCESS_KEY'),
                ],
            ]);
    
            $resultS3 = $s3->getObject([
                'Bucket' => $s3ObjectBucket,
                'Key' => $s3ObjectName
            ]);
    
            if (!file_exists(public_path('temp'))) {
                mkdir(public_path('temp'), 0755, true);
            }
            
            $filename = uniqid() . '.jpg';
            $tempPath = public_path('temp/' . $filename);

            file_put_contents($tempPath, $resultS3['Body']);
    
            $uploadedFile = new \Illuminate\Http\UploadedFile(
                $tempPath,
                $filename,
                $resultS3['ContentType'],
                null,
                true
            );
    
            $newFile = uploadFile($uploadedFile, 'students');
        
            // Remove old file if exists
            if ($student->file_id) {
                $oldFile = File::find($student->file_id);
                if ($oldFile) {
                    removeFile($oldFile);
                }
            }
    
            if($newFile){
                $student->update([
                    'file_id' => $newFile->id,
                ]);
            }
        } catch (\Exception $e) {
            
        }

        $student->update(['face_id' => $faceId]);

        return response()->json([
            'status' => 'success',
            'code' => 200,
            'message' => 'Face uploaded and updated successfully'
        ]);
    }

    public function checkFaces(CheckStudentFaceRequest $request)
    {
        $sisNumbers = $request->input('sis_numbers');
    
        $response = [];
    
        foreach ($sisNumbers as $sisNumber) {
            $student = Student::where('sis_number', $sisNumber)->first();
    
            $response[] = [
                'sis_number' => $sisNumber,
                'fullname' => $student->fullname,
                'face_indexed' => !empty($student->face_id),
            ];
        }
    
        return response()->json([
            'status' => 'success',
            'data' => $response,
        ]);
    }

    public function checkSubscriptions(CheckStudentSubscriptionRequest $request)
    {
        $sisNumbers = $request->input('sis_numbers');

        $response = [];

        foreach ($sisNumbers as $sisNumber) {
            $student = Student::where('sis_number', $sisNumber)->first();

            $subscriptionStatus = $student->subscribedStatus;
            $remainingDays = 0;

            if ($student->subscribed) {
                $activeSubscription = $student->activeSubscription;
                if ($activeSubscription !== null) {
                    $remainingDays = $activeSubscription->balance;
                }

                $inactiveSubscription = $student->inactiveSubscriptions->first();
                if ($inactiveSubscription !== null) {
                    $remainingDays = $inactiveSubscription->balance;
                }
            }

            $response[] = [
                'sis_number' => $sisNumber,
                'fullname' => $student->fullname,
                'subscribed' => $student->subscribed,
                'subscription_status' => $subscriptionStatus,
                'remaining_days' => $remainingDays,
            ];
        }

        return response()->json([
            'status' => 'success',
            'data' => $response,
        ]);
    }
}