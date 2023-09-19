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
    public function index(Queue $queue, Request $request) 
    {
        $queue->with([
            'canteen',
            'canteen.school',
            'canteen.school.logo',
        ]);

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $queueStudents = QueueStudent::with([
            'student',
            'student.image'
        ])->latest()->where([
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
    public function store(Queue $queue, StoreQueueStudentRequest $request) 
    {
        $exited_at = null;

        if ($request->input('exited') == true) {
            $exited_at = $request->get('exited');
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
        $exited_at = null;

        if ($request->input('exited') == true) {
            $exited_at = $request->get('exited');
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
        $queueStudent->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function exit(ExitQueueStudentRequest $request){
        $student = Student::findOrFail($request->get('student_id'));
        $queue = Queue::findOrFail($request->get('queue_id'));

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