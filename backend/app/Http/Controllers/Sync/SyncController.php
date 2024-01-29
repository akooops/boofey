<?php

namespace App\Http\Controllers\Sync;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Http\Requests\Queues\SyncQueueRequest;
use App\Http\Requests\Students\SyncStudentFaceRequest;
use App\Http\Requests\Students\SyncStudentNfcRequest;
use App\Models\File;
use App\Models\Queue;
use App\Models\QueueStudent;
use App\Models\School;
use App\Models\Student;
use Carbon\Carbon;

class SyncController extends Controller
{
    /**
     * Display all academicYears
     * 
     * @return \Illuminate\Http\Response
     */
    public function sync(Request $request) 
    {
        $canteen = $request->get('canteen');

        return response()->json([
            'status' => 'success',
            'data' => [
                'school' => [
                    'id' => $canteen->school->id,
                    'name' => $canteen->school->name,
                    'name_ar' => $canteen->school->name_ar,
                    'logo' => ($canteen->school->logo != null) ? [
                        'id' => $canteen->school->logo->id,
                        'full_path' => $canteen->school->logo->full_path,
                    ] : null,
                ],
                'canteen' => [
                    'id' => $canteen->id,
                    'name' => $canteen->name,
                    'name_ar' => $canteen->name_ar,
                    'address' => $canteen->address,
                    'address_ar' => $canteen->address_ar
                ],
                'current_queue' => ($canteen->currentQueue != null) ? [
                    'id' => $canteen->currentQueue->id,
                    'type' => $canteen->currentQueue->type,
                    'started_at' => $canteen->currentQueue->started_at,
                    'closed_at' => $canteen->currentQueue->closed_at,
                    'students' => $canteen->currentQueue->studentsPlucked
                ] : null,
                'synced_at' => Carbon::now()
            ]
        ]);
    }

    public function syncStudents(Request $request){
        $canteen = $request->get('canteen');
        $students = $canteen->school->students->where('onhold', false)->where('archived', false);

        $studentsData = [];

        foreach($students as $student){
            $studentsData[] = [
                'id' => $student->id,
                'firstname' => $student->firstname,
                'lastname' => $student->lastname,
                'class' => $student->class,
                'className' => $student->className,
                'classNameAr' => $student->classNameAr,
                'nfc_id' => $student->nfc_id,
                'face_id' => $student->face_id,
                'subscribed' => $student->subscribed,
                'subscribedPackage' => $student->subscribedPackage,
                'otp' => [
                    'opt' => $student->otp,
                    'expired_at' => $student->otp_expires_at,
                ],
                'image' => [
                    'id' => $student->image->id,
                    'full_path' => $student->image->full_path,
                ],
                'tookSnackToday' => $student->tookSnackToday,
                'tookMainMealToday' => $student->tookMainMealToday,
            ];
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'students' => $studentsData,
                'synced_at' => Carbon::now()
            ]
        ]);
    }

    public function nfc($id, SyncStudentNfcRequest $request) 
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

        $student->update([
            'nfc_id' => $request->get('nfc_id')
        ]);

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function face($id, SyncStudentFaceRequest $request) 
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

        $student->update([
            'face_id' => $request->get('face_id')
        ]);

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function queues(SyncQueueRequest $request){
        $canteen = $request->get('canteen');

        $queue = $canteen->currentQueue;

        if ($queue == null) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '401' => 'No Current Queue Found For This Canteent For The Moment.'
                ]
            ], 401);
        }

        $students = $request->get('students');

        if(is_string($students) && json_decode($students) !== null) {
            $students = json_decode($students, true);
        }
        
        $synced_at = Carbon::now();

        foreach($students as $student){
            $queueStudent = QueueStudent::where([
                'student_id' => $student['id'],
                'queue_id' => $queue->id
            ])->first();

            if($queueStudent != null)
                continue;

            $queueStudent = QueueStudent::create([
                'started_at' => $student['started_at'],
                'synced_at' => $synced_at,
                'queue_id' => $queue->id,
                'student_id' => $student['id']
            ]);

            $queueStudent->save();

            $activeSubscription = $student->activeSubscription;

            if (!$activeSubscription && $student->onhold != true) {
                $inactiveSubscription = $student->inactiveSubscriptions()->first();

                if ($inactiveSubscription !== null) {
                    $inactiveSubscription->activate();
                }
            }
        }

        return response()->json([
            'status' => 'success'
        ]);
    }
}