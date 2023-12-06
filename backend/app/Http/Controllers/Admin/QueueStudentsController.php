<?php

namespace App\Http\Controllers\Admin;

use App\Models\Queue;
use Illuminate\Http\Request;
use App\Http\Requests\Queues\StoreQueueRequest;
use App\Http\Requests\Queues\UpdateQueueRequest;
use App\Http\Requests\QueueStudents\ExitQueueStudentRequest;
use App\Http\Requests\QueueStudents\StoreQueueStudentRequest;
use App\Http\Requests\QueueStudents\UpdateQueueStudentRequest;
use App\Models\File;
use App\Models\QueueStudent;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class QueueStudentsController extends Controller
{
    /**
     * Display all queues
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Queue $queue, Request $request) 
    {
        $user = Auth::user();

        if (!$user->canteens->contains('id', $queue->canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }

        $queue->load([
            'canteen:id,name,address,school_id',
            'canteen.school:id,name,file_id',
            'canteen.school.logo:id,current_name,path',
        ]);

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $queueStudents = QueueStudent::with([
            'student:id,firstname,lastname,file_id',
            'student.image:id,current_name,path'
        ])->orderBy('id', 'DESC')->where([
            'queue_id' => $queue->id
        ]);

        if ($search) {
            $queueStudents->whereHas('student', function ($query) use ($search) {
                $query->where('id', $search)
                    ->orWhere('firstname', 'like', '%' . $search . '%')
                    ->orWhere('lastname', 'like', '%' . $search . '%')
                    ->orWhereRaw("CONCAT(firstname, ' ', lastname) LIKE ?", ['%' . $search . '%'])
                    ->orWhereRaw("CONCAT(lastname, ' ', firstname) LIKE ?", ['%' . $search . '%'])
                    ->orWhere('nfc_id', 'like', '%' . $search . '%')
                    ->orWhere('face_id', 'like', '%' . $search . '%');;
            });
        }

        $queueStudents = $queueStudents->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'queueStudents' => $queueStudents->items(), 
                'queue' => $queue->makeHidden([
                    'studentsCount', 'studentsInCount', 'studentsExitedCount',
                    'closed', 'started_at', 'closed_at',
                    'lastSyncedAt', 'created_at', 'updated_at'
                ]), 
            ],
            'pagination' => handlePagination($queueStudents)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created queue
     * 
     * @param Queue $queue
     * @param StoreQueueRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(Queue $queue, StoreQueueStudentRequest $request) 
    {
        $user = Auth::user();

        if (!$user->canteens->contains('id', $queue->canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }

        $exited_at = null;

        if ($request->input('exited') == true) {
            $exited_at = $request->get('exited_at');
        }

        $queueStudent = QueueStudent::create(array_merge(
            $request->validated(),
            [
                'queue_id' => $queue->id,
                'synced_at' => Carbon::now(),
                'exited_at' => $exited_at
            ]
        ));

        $queueStudent->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show queue data
     * 
     * @param Queue $queue
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(QueueStudent $queueStudent) 
    {
        $user = Auth::user();

        if (!$user->canteens->contains('id', $queueStudent->queue->canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'queueStudent' => $queueStudent
            ]
        ]);
    }

    /**
     * Update queue data
     * 
     * @param Queue $queue
     * @param UpdateQueueRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(QueueStudent $queueStudent, UpdateQueueStudentRequest $request) 
    {
        $user = Auth::user();

        if (!$user->canteens->contains('id', $queueStudent->queue->canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }

        $exited_at = null;

        if ($request->input('exited') == true) {
            $exited_at = $request->get('exited_at');
        }

        $queueStudent->update(array_merge(
            $request->validated(),
            ['exited_at' => $exited_at]
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete queue data
     * 
     * @param Queue $queue
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(QueueStudent $queueStudent) 
    {
        $user = Auth::user();

        if (!$user->canteens->contains('id', $queueStudent->queue->canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }
        
        $queueStudent->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}