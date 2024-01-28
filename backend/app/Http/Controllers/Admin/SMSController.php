<?php

namespace App\Http\Controllers\Admin;

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
}
