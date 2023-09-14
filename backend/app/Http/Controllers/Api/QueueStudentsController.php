<?php

namespace App\Http\Controllers\Api;

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

class QueueStudentsController extends Controller
{
    /**
     * Display all queues
     * 
     * @return \Illuminate\Http\Response
     */
    public function index($id, Request $request) 
    {
        $queue = Queue::find($id);

        if (!$queue) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $queueStudents = QueueStudent::latest()->where([
            'queue_id' => $queue->id
        ]);

        $queueStudents = $queueStudents->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'queueStudents' => $queueStudents->items(), 
                'queue' => $queue, 
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
    public function store($id, StoreQueueStudentRequest $request) 
    {
        $queue = Queue::find($id);

        if (!$queue) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $queueStudent = QueueStudent::create(array_merge(
            $request->validated(),
            [
                'queue_id' => $queue->id,
                'synced_at' => Carbon::now()
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
    public function show($id) 
    {
        $queueStudent = QueueStudent::with(['queue:id,type'])->find($id);

        if (!$queueStudent) {
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
    public function update($id, UpdateQueueStudentRequest $request) 
    {
        $queueStudent = QueueStudent::find($id);
        
        if (!$queueStudent) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        if ($request->has('exited_at') == false) {
            $request->merge(['exited_at' => null]);
        }

        $queueStudent->update(array_merge(
            $request->all(),
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
    public function destroy($id) 
    {
        $queueStudent = QueueStudent::find($id);

        if (!$queueStudent) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $queueStudent->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function exit(ExitQueueStudentRequest $request){
        $student = Student::find($request->get('student_id'));
        
        if (!$student) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $queue = Queue::find($request->get('queue_id'));
        
        if (!$queue) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $queueStudent = QueueStudent::where([
            'student_id' => $request->get('student_id'),
            'queue_id' => $request->get('queue_id')
        ])->first();

        $queueStudent->update(['exited_at' => Carbon::now()]);

        return response()->json([
            'status' => 'success'
        ]);
    }
}