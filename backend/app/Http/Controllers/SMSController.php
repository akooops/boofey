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
use App\Models\User;
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
            'send_to' => 'required|string',
        ]);

        $sendTo = $request->input('send_to');
        $numbers = [];

        if ($sendTo === 'all') {
            $numbers = $this->getAllNumbers();
        } elseif ($sendTo === 'subscribed') {
            $numbers = $this->getSubscribedNumbers();
        } elseif ($sendTo === 'not_subscribed') {
            $numbers = $this->getNotSubscribedNumbers();
        } else {
            $customNumbers = $request->input('custom_numbers');
            $numbers = $this->validateCustomNumbers($customNumbers);
        }

        $result = sendSMS($request->input('message'), $numbers);

        return view('sms', ['data' => $result]);
    }

    private function validateCustomNumbers($customNumbers)
    {
        $numbers = explode(',', $customNumbers);
        $numbers = array_map('trim', $numbers);
        // You may add additional validation logic here if needed
        return $numbers;
    }

    private function getAllNumbers()
    {
        $phoneNumbers = User::whereHas('father')
        ->pluck('phone')
        ->toArray();

        return $phoneNumbers;
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