<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\SMS\SendByConditionSMSRequest;
use App\Http\Requests\SMS\SendParentsSMSRequest;
use App\Http\Requests\SMS\SendSMSRequest;
use App\Models\Father;
use App\Models\Student;
use App\Models\User;

class SMSController extends Controller
{
    public function sendSMS(SendSMSRequest $request)
    {
        $message = $request->input('message');
        $numbers = $request->input('numbers');

        $result = sendSMS($message, $numbers);

        return response()->json($result);
    }

    public function sendParentsSMS(SendParentsSMSRequest $request){
        $message = $request->input('message');
        $parents = $request->input('parents');

        $phoneNumbers = User::whereIn('id', function ($query) use ($parents) {
            $query->select('user_id')
                  ->from(with(new Father)->getTable())
                  ->whereIn('id', $parents);
        })
        ->pluck('phone')
        ->toArray();

        $result = sendSMS($message, $phoneNumbers);

        return response()->json($result);
    }

    public function sendByCondition(SendByConditionSMSRequest $request)
    {
        $condition = $request->input('condition');
        $message = $request->input('message');
        $smsArr = [];

        if ($condition === 'all') {
            $smsArr = $this->getAllNumbers($message);
        } elseif ($condition === 'subscribed') {
            $smsArr = $this->getSubscribedNumbers($message);
        } elseif ($condition === 'not_subscribed') {
            $smsArr = $this->getNotSubscribedNumbers($message);
        }

        dd($smsArr);

        foreach($smsArr as $key => $sms){
            $result = sendSMS($sms['message'], $sms['number']);
        }

        return view('sms', ['data' => $result]);
    }

    private function getAllNumbers($message)
    {
        $users = User::whereHas('father')->get();

        $sms = [];

        foreach($users as $user){
            $sms[] = [
                'number' => $user->phone,
                'message' => str_replace('%%parent_name%%', $user->profile->fullname, $message)
            ];
        }

        return $sms;
    }

    private function getSubscribedNumbers($message)
    {
        $students = Student::whereHas('activeSubscription')->get();

        $sms = [];

        foreach($students as $student){
            echo $student->name;
            
            $message = str_replace('%%parent_name%%', $student->father->user->profile->fullname, $message);
            $message = str_replace('%%student_name%%', $student->fullname, $message);
            $message = str_replace('%%remaining_days%%', $student->activeSubscription->balance, $message);

            $sms[] = [
                'number' => $student->father->user->phone,
                'message' => $message
            ];
        }

        return $sms;
    }

    private function getNotSubscribedNumbers()
    {
        return [];
    }
}
