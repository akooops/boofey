<?php

namespace App\Http\Requests\Students;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class UpdateStudentRequest extends FormRequest
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

        return [
            'firstname' => 'required|string|max:500',
            'lastname' => 'required|string|max:500',
            'class' => 'required|integer',

            'nfc_id' => 'sometimes|string|unique:students,nfc_id,'.$student,
            'face_id' => 'sometimes|string|unique:students,face_id,'.$student,

            'onhold' => 'required|boolean',

            'father_id' => 'required|numeric',
            'school_id' => 'required|numeric',
            'academic_year_id' => 'required|numeric',

            'file' => 'sometimes|file|mimes:jpeg,png'    
        ];
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