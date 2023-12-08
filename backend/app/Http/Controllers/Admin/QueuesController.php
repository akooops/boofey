<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Queues\CloseQueueRequest;
use App\Http\Requests\Queues\QRExitRequest;
use App\Models\Queue;
use Illuminate\Http\Request;
use App\Http\Requests\Queues\StoreQueueRequest;
use App\Http\Requests\Queues\UpdateQueueRequest;
use App\Models\File;
use App\Models\Canteen;
use App\Models\QueueStudent;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class QueuesController extends Controller
{
    /**
     * Display all queues
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Canteen $canteen, Request $request) 
    {
        $user = Auth::user();

        if (!$user->canteens->contains('id', $canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }

        $canteen->load([
            'school:id,name,file_id',
            'school.logo:id,current_name,path'
        ]);

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $started_at = $request->query('started_at', null);

        $today = Carbon::today();

        $activeQueue = Queue::where('canteen_id', $canteen->id)
            ->whereDate('started_at', $today)
            ->where('closed_at', null)
            ->first();

        $queues = Queue::orderBy('id', 'DESC')->where([
            'canteen_id' => $canteen->id
        ]);

        if(!is_null($started_at)){
            $queues->whereDate('started_at', Carbon::parse($started_at));
        }

        if($activeQueue != null)
            $queues->whereNotIn('id', [$activeQueue->id]);

        $queues = $queues->newQuery()->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'queues' => $queues->items(), 
                'activeQueue' => $activeQueue,
                'canteen' => $canteen->makeHidden(['created_at', 'updated_at']), 
            ],
            'pagination' => handlePagination($queues)
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
    public function store(Canteen $canteen, StoreQueueRequest $request) 
    {
        $user = Auth::user();

        if (!$user->canteens->contains('id', $canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }

        $today = Carbon::today();

        $activeQueues = Queue::where('canteen_id', $canteen->id)
            ->whereDate('started_at', $today)
            ->where('closed_at', null)
            ->count() > 0;

        if($activeQueues == true){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '422' => 'A current queue already exists for this canteen for today.'
                ]
            ], 422);
        }

        $queue = Queue::create(array_merge(
            $request->validated(),
            [
                'canteen_id' => $canteen->id,
                'started_at' => Carbon::now()
            ]
        ));

        $queue->save();

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
    public function show(Queue $queue) 
    {        
        $user = Auth::user();

        if (!$user->canteens->contains('id', $queue->canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'queue' => $queue
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
    public function update(Queue $queue, UpdateQueueRequest $request) 
    {
        $user = Auth::user();

        if (!$user->canteens->contains('id', $queue->canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }

        $queue->update(array_merge(
            $request->validated(),
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function close(Queue $queue, CloseQueueRequest $request) 
    {
        $user = Auth::user();

        if (!$user->canteens->contains('id', $queue->canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }

        $queue->update(
            ['closed_at' => is_null($queue->closed_at) ? Carbon::now() : NULL]
        );

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
    public function destroy(Queue $queue) 
    {
        $user = Auth::user();

        if (!$user->canteens->contains('id', $queue->canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }

        $queue->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
    
    public function exit(Canteen $canteen, QRExitRequest $request){
        $user = Auth::user();

        if (!$user->canteens->contains('id', $canteen->id)) {
            return response()->json([
                'status' => 'error',
                'permissions' => 'User does not have the right permissions to control this canteen.'
            ], 403);
        }
        
        $queueStudent = QueueStudent::where([
            'student_id' => $request->get('student_id'),
            'queue_id' => $canteen->currentQueue->id
        ])->first();

        $queueStudent->update(['exited_at' => Carbon::now()]);

        return response()->json([
            'status' => 'success'
        ]);
    }
}