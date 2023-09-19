<?php

namespace App\Http\Controllers\Api;

use App\Models\Canteen;
use Illuminate\Http\Request;
use App\Http\Requests\Canteens\StoreCanteenRequest;
use App\Http\Requests\Canteens\UpdateCanteenRequest;
use App\Models\File;
use App\Models\School;

class CanteensController extends Controller
{
    /**
     * Display all canteens
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

        $canteens = $this->getCanteensQuery($request);

        $response = [
            'status' => 'success',
            'data' => [
                'canteens' => $canteens->items(),
            ],
            'pagination' => handlePagination($canteens),
        ];

        return response()->json($response);
    }

    public function indexBySchool(School $school, Request $request)
    {
        $canteens = $this->getCanteensQuery($request, $school);

        $response = [
            'status' => 'success',
            'data' => [
                'canteens' => $canteens->items(),
                'school' => $school,
            ],
            'pagination' => handlePagination($canteens),
        ];

        return response()->json($response);
    }

    private function getCanteensQuery(Request $request, School $school = null)
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $canteensQuery = Canteen::latest();

        if ($school) {
            $canteensQuery->where('school_id', $school->id);
        }

        if ($search) {
            $canteensQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('address', 'like', '%' . $search . '%');
            })
            ->orWhereHas('school', function ($schoolQuery) use ($search) {
                $schoolQuery->where('name', 'like', '%' . $search . '%');
            });        
        }

        return $canteensQuery->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * Store a newly created canteen
     * 
     * @param Canteen $canteen
     * @param StoreCanteenRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCanteenRequest $request) 
    {
        $schoolId = $request->get('school_id');
        $school = School::findOrFail($schoolId);

        $apiKey = $this->createCanteen($request, $school);
    
        return response()->json([
            'status' => 'success',
            'data' => [
                'api_key' => $apiKey
            ]
        ]);
    }

    /**
     * Store a newly created academicYear
     * 
     * @param AcademicYear $academicYear
     * @param StoreAcademicYearRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function storeBySchool(School $school, StoreCanteenRequest $request) 
    {
        $apiKey = $this->createCanteen($request, $school);

        return response()->json([
            'status' => 'success',
            'data' => [
                'api_key' => $apiKey
            ]
        ]);
    }

    public function createCanteen($request, School $school = null) 
    {
        $canteen = Canteen::create(array_merge(
            $request->validated(),
            [
                'school_id' => $school->id
            ]
        ));

        $canteen->save();
        $canteen->generateApiKey();

        return $canteen->getDecryptedKey();
    }

    /**
     * Show canteen data
     * 
     * @param Canteen $canteen
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Canteen $canteen) 
    {        
        return response()->json([
            'status' => 'success',
            'data' => [
                'canteen' => $canteen
            ]
        ]);
    }

    /**
     * Update canteen data
     * 
     * @param Canteen $canteen
     * @param UpdateCanteenRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(Canteen $canteen, UpdateCanteenRequest $request) 
    {
        $canteen->update($request->validated());

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function generate(Canteen $canteen) 
    {
        $canteen->generateApiKey();

        return response()->json([
            'status' => 'success',
            'data' => [
                'api_key' => $canteen->getDecryptedKey()
            ]
        ]);
    }

    public function revoke(Canteen $canteen) 
    {
        $canteen->revokeApiKey();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete canteen data
     * 
     * @param Canteen $canteen
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Canteen $canteen) 
    {
        $canteen->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}