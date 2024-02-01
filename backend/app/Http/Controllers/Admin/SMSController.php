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

        return response()->json([
            'status' => 'success'
        ]);

        //$result = sendSMS($message, $numbers);

        //return response()->json($result);
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

        return response()->json([
            'status' => 'success'
        ]);

        //$result = sendSMS($message, $phoneNumbers);

        //return response()->json($result);
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

        return response()->json([
            'status' => 'success'
        ]);

        foreach($smsArr as $key => $sms){
            $result = sendSMS($sms['message'], $sms['number']);
        }

        return response()->json([
            'status' => 'success'
        ]);
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
            $formattedMessage = str_replace('%%parent_name%%', $student->father->user->profile->fullname, $message);
			$formattedMessage = str_replace('%%student_name%%', $student->fullname, $formattedMessage);
			$formattedMessage = str_replace('%%remaining_days%%', $student->activeSubscription->balance, $formattedMessage);

            $sms[] = [
                'number' => $student->father->user->phone,
                'message' => $formattedMessage
            ];
        }

        return $sms;
    }

    private function getNotSubscribedNumbers($message)
    {
        $students = Student::doesntHave('activeSubscription')->get();

        $sms = [];

        foreach($students as $student){
            $formattedMessage = str_replace('%%parent_name%%', $student->father->user->profile->fullname, $message);
			$formattedMessage = str_replace('%%student_name%%', $student->fullname, $formattedMessage);

            $sms[] = [
                'number' => $student->father->user->phone,
                'message' => $formattedMessage
            ];
        }

        return $sms;
    }
}
