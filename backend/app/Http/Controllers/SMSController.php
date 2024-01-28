<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use Illuminate\Http\Request;
use App\Http\Requests\Billings\StoreBillingRequest;
use App\Http\Requests\Billings\UpdateBillingRequest;
use App\Models\AcademicYear;
use App\Models\Father;
use App\Models\File;
use App\Models\School;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class SMSController extends Controller
{
    public function index(){
        return view('sms');
    }

    public function send(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'numbers' => 'required|string',
        ]);

        $numbers = explode(',', $request->input('numbers'));

        $numbers = array_map('trim', $numbers);

        $result = sendSMS($request->input('message'), $numbers);

        return view('sms', ['data' => $result]);
    }
}