<?php

namespace App\Http\Requests\Students;

use App\Rules\CanGenerateOtp;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Validator;

class NotifyStudentParentRequest extends FormRequest
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
        return [

        ];
    }

    public function withValidator(Validator $validator)
    {
        $student = $this->route('student');

        $validator->after(function ($validator) use ($student){
            if ($student->face_id) {
                $validator->errors()->add('student', 'This student face is already indexed in our systems.');
            }
        });
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
