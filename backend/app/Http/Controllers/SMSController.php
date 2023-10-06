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
    public function testSMS(){
        $app_id = env('4JAWALY_API_KEY');
        $app_sec = env('4JAWALY_API_SECRET_KEY');
        $app_hash = base64_encode("{$app_id}:{$app_sec}");

        $messages = [
            "messages" => [
                [
                    "text" => "test",
                    "numbers" => ["+213665797365"],
                    "sender" => "QRIT"
                ]
            ]
        ];

        $url = "https://api-sms.4jawaly.com/api/v1/account/area/sms/send";

        $response = Http::withHeaders([
            "Accept" => "application/json",
            "Content-Type" => "application/json",
            "Authorization" => "Basic {$app_hash}"
        ])->post($url, $messages);

        $status_code = $response->status();
        $response_json = $response->json();

        if ($status_code == 200) {
            if (isset($response_json["messages"][0]["err_text"])) {
                return response()->json(["error" => $response_json["messages"][0]["err_text"]], $status_code);
            } else {
                return response()->json(["message" => "تم الارسال بنجاح  " . " job id:" . $response_json["job_id"]], $status_code);
            }
        } elseif ($status_code == 400) {
            return response()->json(["error" => $response_json["message"]], $status_code);
        } elseif ($status_code == 422) {
            return response()->json(["error" => "نص الرسالة فارغ"], $status_code);
        } else {
            return response()->json(["error" => "محظور بواسطة كلاودفلير. Status code: {$status_code}"], $status_code);
        }
    }
}