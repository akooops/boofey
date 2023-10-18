<?php

namespace App\Http\Controllers\Admin;

use App\Models\Queue;
use Illuminate\Http\Request;
use App\Http\Requests\Queues\StoreQueueRequest;
use App\Http\Requests\Queues\UpdateQueueRequest;
use App\Models\File;
use App\Models\Canteen;
use Carbon\Carbon;

class QueuesController extends Controller
{
    /**
     * Display all queues
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Canteen $canteen, Request $request) 
    {
        $canteen->load([
            'school:id,name,file_id',
            'school.logo:id,current_name,path'
        ]);

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $today = Carbon::today();

        $activeQueue = Queue::where('canteen_id', $canteen->id)
            ->whereDate('started_at', $today)
            ->where('closed_at', null)
            ->first();

        $queues = Queue::latest()->where([
            'canteen_id' => $canteen->id
        ]);

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
        $today = Carbon::today();

        $activeQueues = Queue::where('canteen_id', $queue->canteen->id)
            ->whereNotIn('id', [$queue->id])
            ->whereDate('started_at', $today)
            ->where('closed_at', null)
            ->count() > 0;

        if($activeQueues == true && $request->get('close') == false){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '422' => 'A current queue already exists for this canteen for today.'
                ]
            ], 422);
        }

        if($request->get('close') == true){
            $queue->students()->whereNull('exited_at')->update(['exited_at' => now()]);
        }

        $queue->update(array_merge(
            $request->validated(),
            ['closed_at' => $request->get('close') == true ? Carbon::now() : NULL]
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
    public function destroy(Queue $queue) 
    {
        $queue->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}