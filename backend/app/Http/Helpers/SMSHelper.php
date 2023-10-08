<?php

use Illuminate\Support\Facades\Http;

function sendSMS($text, $number){
    $app_id = env("4JAWALY_API_KEY");
    $app_sec = env("4JAWALY_API_SECRET_KEY");
    $app_hash = base64_encode("{$app_id}:{$app_sec}");

    $messages = [
        "messages" => [
            [
                "text" => $text,
                "numbers" => ["9665".substr($number, 2)],
                "sender" => env("4JAWALY_SENDER_ID")
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
            return [
                "status" => "error",
                "error" => $response_json["messages"][0]["err_text"]
            ];
        } else {
            return [
                "status" => "success",
                "data" => [
                    "job_id" => $response_json["job_id"]
                ]
            ];
        }
    } elseif ($status_code == 400) {
        return [
            "status" => "error",
            "status_code" => "400",
            "error" => $response_json["message"]
        ];
    } elseif ($status_code == 422) {
        return [
            "status" => "error",
            "status_code" => "422",
            "error" => [
                "text" => [
                    "Message text is empty"
                ]
            ]
        ];

    } else {
        return [
            "status" => "error",
            "status_code" => $status_code,
            "error" => "Blocked by cloudflare"
        ];
    }
}