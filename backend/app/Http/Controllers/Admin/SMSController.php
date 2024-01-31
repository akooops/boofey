<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\SMS\SendByConditionSMSRequest;
use App\Http\Requests\SMS\SendParentsSMSRequest;
use App\Http\Requests\SMS\SendSMSRequest;
use App\Models\Father;
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
        $sms = [];

        if ($condition === 'all') {
            $sms = $this->getAllNumbers($message);
        } elseif ($condition === 'subscribed') {
            $numbers = $this->getSubscribedNumbers();
        } elseif ($condition === 'not_subscribed') {
            $numbers = $this->getNotSubscribedNumbers();
        }

        dd($sms);

        $result = sendSMS($request->input('message'), $numbers);

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

    private function getSubscribedNumbers()
    {
        return [];
    }

    private function getNotSubscribedNumbers()
    {
        return [];
    }
}
