<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\SendSmsRequest;
use App\Http\Requests\SMS\SendSMSRequest as SMSSendSMSRequest;

class SmsController extends Controller
{
    public function sendSMS(SMSSendSMSRequest $request)
    {
        $message = $request->input('message');
        $numbers = $request->input('numbers');

        $result = sendSMS($message, $numbers);

        return response()->json($result);
    }
}
