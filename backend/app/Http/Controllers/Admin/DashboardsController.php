<?php

namespace App\Http\Controllers\Admin;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Models\Canteen;
use App\Models\Father;
use App\Models\File;
use App\Models\Order;
use App\Models\Queue;
use App\Models\School;
use App\Models\Student;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DashboardsController extends Controller
{
    public function count(Request $request){
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if (empty($startDate) || empty($endDate)) {
            $startDate = now()->subDays(7)->format('Y-m-d');
            $endDate = now()->format('Y-m-d');

            $previousEndDate = Carbon::parse($startDate)->subDay()->format('Y-m-d');
            $previousStartDate = Carbon::parse($previousEndDate)->subDays(7)->format('Y-m-d');
        }else{
            $dateDiff = Carbon::parse($startDate)->diffInDays(Carbon::parse($endDate));
            $previousStartDate = Carbon::parse($startDate)->subDays($dateDiff)->format('Y-m-d');
            $previousEndDate = Carbon::parse($startDate)->subDay()->format('Y-m-d');
        }

        $subscribersCount = $this->subscribersCount($startDate, $endDate);
        $previousSubscribersCount = $this->subscribersCount($previousStartDate, $previousEndDate);
        $subscribersCountDiff = $this->calulcateDiff($subscribersCount, $previousSubscribersCount);

        $studentsCount = $this->studentsCount($startDate, $endDate);
        $previousstudentsCountCount = $this->studentsCount($previousStartDate, $previousEndDate);
        $studentsCountsCountDiff = $this->calulcateDiff($studentsCount, $previousstudentsCountCount);

        $fathersCount = $this->fathersCount($startDate, $endDate);
        $previousFathersCount = $this->fathersCount($previousStartDate, $previousEndDate);
        $fathersCountDiff = $this->calulcateDiff($fathersCount, $previousFathersCount);

        $subscriptionsTotal = $this->subscriptionsTotal($startDate, $endDate);
        $previousSubscriptionsTotal = $this->subscriptionsTotal($previousStartDate, $previousEndDate);
        $subscriptionsTotalDiff = $this->calulcateDiff($subscriptionsTotal, $previousSubscriptionsTotal);

        $ordersTotal = $this->ordersTotal($startDate, $endDate);
        $previousOrdersTotal = $this->ordersTotal($previousStartDate, $previousEndDate);
        $ordersTotalDiff = $this->calulcateDiff($ordersTotal, $previousOrdersTotal);

        return response()->json([
            'status' => 'success',
            'data' => [
                'subscribersCount' => [
                    'value' => $subscribersCount,
                    'percentageDiff' => $subscribersCountDiff['percentageDiff'],
                    'increase' => $subscribersCountDiff['increase'],
                ],
                'studentsCount' => [
                    'value' => $studentsCount,
                    'percentageDiff' => $studentsCountsCountDiff['percentageDiff'],
                    'increase' => $studentsCountsCountDiff['increase'],
                ],
                'fathersCount' => [
                    'value' => $fathersCount,
                    'percentageDiff' => $fathersCountDiff['percentageDiff'],
                    'increase' => $fathersCountDiff['increase'],
                ],
                'subscriptionsTotal' => [
                    'value' => $subscriptionsTotal,
                    'percentageDiff' => $subscriptionsTotalDiff['percentageDiff'],
                    'increase' => $subscriptionsTotalDiff['increase'],
                ],
                'ordersTotal' => [
                    'value' => $ordersTotal,
                    'percentageDiff' => $ordersTotalDiff['percentageDiff'],
                    'increase' => $ordersTotalDiff['increase'],
                ],
            ]
        ]);
    }

    private function calulcateDiff($current, $prev){
        if ($prev == 0) {
            return [
                'percentageDiff' => ($current > 0) ? 100 : 0,
                'increase' => ($current > 0) ? 'increase' : 'neutral'
            ];
        }
    
        $percentageDiff = (($current - $prev) / $prev) * 100;
        $percentageDiff = number_format($percentageDiff, 2);

        return [
            'percentageDiff' => $percentageDiff,
            'increase' => ($percentageDiff > 0) ? 'increase' : (($percentageDiff < 0) ? 'decrease' : 'neutral')
        ];
    }

    private function subscribersCount($startDate, $endDate){
        $subscribersCount = Subscription::where('status', 'active')
        ->whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->count();

        return $subscribersCount;
    }

    private function studentsCount($startDate, $endDate){
        $studentsCount = Student::whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->count();

        return $studentsCount;
    }

    private function fathersCount($startDate, $endDate){
        $fathersCount = Father::whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->count();

        return $fathersCount;
    }

    private function subscriptionsTotal($startDate, $endDate){
        $subscriptionsTotal = Subscription::whereNot('exclude_from_calculation', true)
        ->whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->sum('total');

        return round($subscriptionsTotal, 3);
    }

    private function ordersTotal($startDate, $endDate){
        $ordersTotal = Order::whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->sum('total');

        return round($ordersTotal, 3);
    }

    public function lastSubscribedStudents(Request $request){
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $subscriptions = Subscription::whereIn('status', ['active', 'inactive'])
            ->with([
                'student:id,firstname,lastname,file_id',
                'student.image:id,current_name,path',
                'package:id,name,code,school_id',
                'package.school:id,name,file_id',
                'package.school.logo:id,current_name,path',
            ])
            ->orderBy('subscriptions.created_at');

        if ($search) {
            $subscriptions->whereHas('student', function ($studentQuery) use ($search) {
                $studentQuery->where('firstname', 'like', '%' . $search . '%')
                    ->orWhere('lastname', 'like', '%' . $search . '%')
                    ->orWhere('nfc_id', 'like', '%' . $search . '%')
                    ->orWhere('face_id', 'like', '%' . $search . '%')
                    ->orWhereHas('father', function ($fatherQuery) use ($search) {
                        $fatherQuery->where(function ($query) use ($search) {
                            $query->whereHas('user', function ($userQuery) use ($search) {
                                    $userQuery->where('username', 'like', '%' . $search . '%')
                                        ->orWhere('email', 'like', '%' . $search . '%')
                                        ->orWhere('phone', 'like', '%' . $search . '%')
                                        ->orWhereHas('profile', function ($profileQuery) use ($search) {
                                            $profileQuery->where('firstname', 'like', '%' . $search . '%')
                                                ->orWhere('lastname', 'like', '%' . $search . '%');
                                        });
                                });
                        });
                    });
            }); 
        }

        $subscriptions = $subscriptions->paginate($perPage, ['*'], 'page', $page);

        $subscriptions->each(function ($subscription) {
            $subscription->student->makeHidden('activeSubscription');
        });

        $response = [
            'status' => 'success',
            'data' => $subscriptions->items(), 
            'pagination' => handlePagination($subscriptions),
        ];

        return response()->json($response);
    }

    public function expiringSoonStudents(Request $request){
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $subscriptions = Subscription::whereHas('student', function ($query) {
                $query->whereDoesntHave('subscriptionsWithoutActive');
            })
            ->with([
                'student:id,firstname,lastname,file_id',
                'student.image:id,current_name,path',
                'package:id,name,code,school_id',
                'package.school:id,name,file_id',
                'package.school.logo:id,current_name,path',
            ])
            ->orderBy('subscriptions.balance');

        if ($search) {
            $subscriptions->whereHas('student', function ($studentQuery) use ($search) {
                $studentQuery->where('firstname', 'like', '%' . $search . '%')
                    ->orWhere('lastname', 'like', '%' . $search . '%')
                    ->orWhere('nfc_id', 'like', '%' . $search . '%')
                    ->orWhere('face_id', 'like', '%' . $search . '%')
                    ->orWhereHas('father', function ($fatherQuery) use ($search) {
                        $fatherQuery->where(function ($query) use ($search) {
                            $query->whereHas('user', function ($userQuery) use ($search) {
                                    $userQuery->where('username', 'like', '%' . $search . '%')
                                        ->orWhere('email', 'like', '%' . $search . '%')
                                        ->orWhere('phone', 'like', '%' . $search . '%')
                                        ->orWhereHas('profile', function ($profileQuery) use ($search) {
                                            $profileQuery->where('firstname', 'like', '%' . $search . '%')
                                                ->orWhere('lastname', 'like', '%' . $search . '%');
                                        });
                                });
                        });
                    });
            }); 
        }    

        $subscriptions = $subscriptions->paginate($perPage, ['*'], 'page', $page);

        $subscriptions->each(function ($subscription) {
            $subscription->student->makeHidden('activeSubscription');
        });

        $response = [
            'status' => 'success',
            'data' => $subscriptions->items(), 
            'pagination' => handlePagination($subscriptions),
        ];

        return response()->json($response);
    }

    public function absentStudents(Request $request){
        //get back here and check if i need to disaply only active subs
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $today = Carbon::today();

        $absentStudents = Student::select('id', 'firstname', 'lastname', 'class', 'father_id', 'school_id', 'file_id')
        ->whereDoesntHave('queues', function ($query) use ($today) {
            $query->whereDate('queues.started_at', $today);
        })->with([
            'image:id,current_name,path',
            'father:id,user_id',
            'father.user:id,username,email,phone',
            'father.user.profile:id,firstname,lastname,user_id,file_id',
            'father.user.profile.image:id,current_name,path',
            'school:id,name,file_id',
            'school.logo:id,current_name,path',
        ])->orderBy('id', 'DESC');

        if ($search) {
            $absentStudents->where('firstname', 'like', '%' . $search . '%')
                    ->orWhere('lastname', 'like', '%' . $search . '%')
                    ->orWhere('nfc_id', 'like', '%' . $search . '%')
                    ->orWhere('face_id', 'like', '%' . $search . '%')
                    ->orWhereHas('father', function ($fatherQuery) use ($search) {
                        $fatherQuery->where(function ($query) use ($search) {
                            $query->whereHas('user', function ($userQuery) use ($search) {
                                    $userQuery->where('username', 'like', '%' . $search . '%')
                                        ->orWhere('email', 'like', '%' . $search . '%')
                                        ->orWhere('phone', 'like', '%' . $search . '%')
                                        ->orWhereHas('profile', function ($profileQuery) use ($search) {
                                            $profileQuery->where('firstname', 'like', '%' . $search . '%')
                                                ->orWhere('lastname', 'like', '%' . $search . '%');
                                        });
                                });
                        });
                    });
        }   

        $absentStudents = $absentStudents->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $absentStudents->makeHidden(['activeSubscription']), 
            'pagination' => handlePagination($absentStudents),
        ];

        return response()->json($response);
    }

    public function canteensStatus(Request $request){
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $canteens = Canteen::with([
            'school:id,name,file_id',
            'school.logo:id,current_name,path'
        ])->orderBy('id', 'DESC'); 

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
            'data' => $canteens->makeHidden(['currentQueue']), 
            'pagination' => handlePagination($canteens),
        ];
            
        return response()->json($response);
    }

    public function pendingStudents(Request $request){
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        
        $today = Carbon::today();

        $pendingStudents = Student::select('id', 'firstname', 'lastname', 'class', 'father_id', 'school_id', 'file_id')
            ->whereHas('queues', function ($query) use ($today) {
                $query->whereDate('queues.started_at', $today)->whereHas('queueStudents', function ($query) {
                    $query->where('exited_at', NULL);
                });
            });

        $pendingStudents = $pendingStudents->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $pendingStudents->makeHidden('activeSubscription'), 
            'pagination' => handlePagination($pendingStudents),
        ];

        return response()->json($response);
    }

    public function doneByCanteens(Canteen $canteen, Request $request)
    {
        $range = $request->input('range', 'last7days');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
    
        if ($range === 'custom' && (empty($startDate) || empty($endDate))) {
            $startDate = Carbon::now()->subDays(7)->startOfDay();
            $endDate = Carbon::now()->endOfDay();
        } else {
            $startDate = Carbon::parse($startDate);
            $endDate = Carbon::parse($endDate);
        }
    
        if ($range !== 'custom') {
            $dateRanges = [
                'yesterday' => [Carbon::yesterday(), Carbon::yesterday()],
                'last7days' => [Carbon::now()->subDays(7), Carbon::now()],
                'last28days' => [Carbon::now()->subDays(28), Carbon::now()],
            ];
    
            if (isset($dateRanges[$range])) {
                list($startDate, $endDate) = $dateRanges[$range];
            }
        }
    
        $intervals = $this->generateTimeIntervals($startDate, $endDate);
    
        $counts = [];
    
        foreach ($intervals as $interval) {
            $count = 0; 

            if ($interval['type'] === 'year') {
                $count = $canteen->countQueueStudents('year', $interval['year']);
            } elseif ($interval['type'] === 'month') {
                $count = $canteen->countQueueStudents('month', $interval['year'], $interval['month']);
            }else{
                $count = $canteen->countQueueStudents('day', $interval['year'], $interval['month'], $interval['day']);
            }


            $counts[] = [
                'date' => $interval['date'],
                'count' => $count,
            ];
        }

        $response = [
            'status' => 'success',
            'data' => [
                'canteen' => $canteen->makeHidden(['currentQueue']),
                'counts' => $counts
            ]
        ];

        return response()->json($response);
    }

    public function avgByCanteens(Canteen $canteen, Request $request)
    {
        $range = $request->input('range', 'last7days');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
    
        if ($range === 'custom' && (empty($startDate) || empty($endDate))) {
            $startDate = Carbon::now()->subDays(7)->startOfDay();
            $endDate = Carbon::now()->endOfDay();
        } else {
            $startDate = Carbon::parse($startDate);
            $endDate = Carbon::parse($endDate);
        }
    
        if ($range !== 'custom') {
            $dateRanges = [
                'yesterday' => [Carbon::yesterday(), Carbon::yesterday()],
                'last7days' => [Carbon::now()->subDays(7), Carbon::now()],
                'last28days' => [Carbon::now()->subDays(28), Carbon::now()],
            ];
    
            if (isset($dateRanges[$range])) {
                list($startDate, $endDate) = $dateRanges[$range];
            }
        }
    
        $intervals = $this->generateTimeIntervals($startDate, $endDate);
    
        $avgs = [];
    
        foreach ($intervals as $interval) {
            $averageMinutes = 0; 

            if ($interval['type'] === 'year') {
                $averageMinutes = $canteen->averageStudentTimeDifferenceInMinutes('year', $interval['year']);
            } elseif ($interval['type'] === 'month') {
                $averageMinutes = $canteen->averageStudentTimeDifferenceInMinutes('month', $interval['year'], $interval['month']);
            }else{
                $averageMinutes = $canteen->averageStudentTimeDifferenceInMinutes('day', $interval['year'], $interval['month'], $interval['day']);
            }


            $avgs[] = [
                'date' => $interval['date'],
                'avg' => $averageMinutes,
            ];
        }

        $response = [
            'status' => 'success',
            'data' => [
                'canteen' => $canteen->makeHidden(['currentQueue']),
                'avgs' => $avgs
            ]
        ];

        return response()->json($response);
    }

    public function dailyTotal(Request $request)
    {
        $range = $request->input('range', 'last7days');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
    
        if ($range === 'custom' && (empty($startDate) || empty($endDate))) {
            $startDate = Carbon::now()->subDays(7)->startOfDay();
            $endDate = Carbon::now()->endOfDay();
        } else {
            $startDate = Carbon::parse($startDate);
            $endDate = Carbon::parse($endDate);
        }
    
        if ($range !== 'custom') {
            $dateRanges = [
                'yesterday' => [Carbon::yesterday(), Carbon::yesterday()],
                'last7days' => [Carbon::now()->subDays(7), Carbon::now()],
                'last28days' => [Carbon::now()->subDays(28), Carbon::now()],
            ];
    
            if (isset($dateRanges[$range])) {
                list($startDate, $endDate) = $dateRanges[$range];
            }
        }
    
        $endDate = $endDate->endOfDay();
    
        $intervals = $this->generateTimeIntervals($startDate, $endDate);
    
        $totals = [];
    
        foreach ($intervals as $interval) {
            $subscriptions = Subscription::where('exclude_from_calculation', false);
    
            if ($interval['type'] === 'year') {
                $subscriptions->whereYear('created_at', $interval['year']);
            } elseif ($interval['type'] === 'month') {
                $subscriptions->whereYear('created_at', $interval['year'])
                            ->whereMonth('created_at', $interval['month']);
            } else {
                $subscriptions->whereYear('created_at', $interval['year'])
                            ->whereMonth('created_at', $interval['month'])
                            ->whereDay('created_at', $interval['day']);
            }
    
            $total = $subscriptions->sum('total');
    
            $totals[] = [
                'date' => $interval['date'],
                'total' => $total,
            ];
        }
    
        $response = [
            'status' => 'success',
            'data' => $totals,
        ];
    
        return response()->json($response);
    }

    private function generateTimeIntervals($startDate, $endDate)
    {
        $daysDiff = Carbon::parse($startDate)->diffInDays(Carbon::parse($endDate));

        if ($daysDiff > 730) 
            $interval = 'year';
        else if($daysDiff > 90)
            $interval = 'month';
         else
            $interval = 'day';
    

        $currentDate = Carbon::parse($startDate);
        $intervals = [];

        while ($currentDate->lte($endDate)) {
            $tmp = [
                'type' => $interval,
            ];

            if ($interval === 'year') {
                $tmp['date'] = $currentDate->format('Y');
                $tmp['year'] = $currentDate->format('Y');

                $currentDate->addYear();
            } else if ($interval === 'month') {
                $tmp['date'] = $currentDate->format('Y M');
                $tmp['year'] = $currentDate->format('Y');
                $tmp['month'] = $currentDate->format('m');

                $currentDate->addMonth();
            } else {
                $tmp['date'] = $currentDate->format('M d');
                $tmp['year'] = $currentDate->format('Y');
                $tmp['month'] = $currentDate->format('m');
                $tmp['day'] = $currentDate->format('d');
                $currentDate->addDay();
            }

            $intervals[] = $tmp;
        }

        return $intervals;
    }
}

