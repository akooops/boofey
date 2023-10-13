<?php

namespace App\Http\Controllers\Admin;

use App\Models\Canteen;
use Illuminate\Http\Request;
use App\Http\Requests\CanteenUsers\StoreCanteenUserRequest;
use App\Models\CanteenUser;
use App\Models\File;
use App\Models\School;
use App\Models\User;

class CanteenUsersController extends Controller
{
    public function getCanteens(Request $request){
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $canteens = Canteen::latest()->with(
            'school:id,name,file_id',
            'school.logo:id,current_name,path'
        );

        if ($search) {
            $canteens->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('address', 'like', '%' . $search . '%');
            })
            ->orWhereHas('school', function ($schoolQuery) use ($search) {
                $schoolQuery->where('name', 'like', '%' . $search . '%');
            });        
        }

        $canteens = $canteens->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'canteens' => $canteens->items(),
            ],
            'pagination' => handlePagination($canteens),
        ];

        return response()->json($response);
    }

    public function index(User $user, Request $request) 
    {
        if ($user->hasRole('parent') == true) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '400' => 'This user is a parent which can not hancle canteens'
                ]
            ], 400);
        }

        $user->load([
            'profile:id,user_id,firstname,lastname,file_id',
            'profile.image:id,current_name,path',
        ]);

        $canteens = $user->canteens()->with([
            'school:id,name,file_id',
            'school.logo:id,current_name,path'
        ]);

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        if ($search) {
            $canteens->where(function ($query) use ($search) {
                $query->where('address', 'like', '%' . $search . '%')
                    ->orWhereHas('school', function ($schoolQuery) use ($search) {
                        $schoolQuery->where('name', 'like', '%' . $search . '%');
                    });
            });
        }

        $canteens = $canteens->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'canteens' => $canteens->items(),
                'user' => $user->makeHidden(['canteens']),
            ],
            'pagination' => handlePagination($canteens)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created academicYear
     * 
     * @param AcademicYear $academicYear
     * @param StoreAcademicYearRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(User $user, StoreCanteenUserRequest $request) 
    {
        if ($user->hasRole('parent') == true) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '400' => 'This user is a parent which can not hancle canteens'
                ]
            ], 400);
        }

        $canteenUser = $user->canteensUsers()->where('canteen_id', $request->input('canteen_id'))->first();

        if($canteenUser != null){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'canteen_id' => [
                        'This canteens is already controlled by this user.'
                    ]
                ],
            ], 422);
        }

        $user->canteensUsers()->create([
            'canteen_id' => $request->input('canteen_id')
        ]);

        return response()->json([
            'status' => 'success',
        ]);
    }

    /**
     * Delete canteen data
     * 
     * @param Canteen $canteen
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(CanteenUser $canteenUser) 
    {
        $canteenUser->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}