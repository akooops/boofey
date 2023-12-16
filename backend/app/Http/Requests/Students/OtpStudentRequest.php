<?php

namespace App\Http\Requests\Students;

use App\Rules\CanGenerateOtp;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

class OtpStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $student = request()->route('student');

        $currentRoute = Route::currentRouteName();

        $rules = [
            'otp_expires_later' => 'required|boolean',
            'otp_expires_at' => 'required_if:otp_expires_later,true|nullable|date_format:Y-m-d H:i:s,Y-m-d H:i|after_or_equal:now'    
        ];

        if($currentRoute === 'parents.students.otp'){
            $this->merge([
                'student_id' => $student->id,
            ]);

            $rules = [
                'student_id' => [new CanGenerateOtp($student->id)]
            ];
        }

        return $rules;
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new ValidationException($validator, $this->buildFailedValidationResponse($validator));
    }

    protected function buildFailedValidationResponse(\Illuminate\Contracts\Validation\Validator $validator)
    {
        return new JsonResponse([
            'status' => 'error',
            'errors' => $validator->errors(),
        ], 422);
    }
}
