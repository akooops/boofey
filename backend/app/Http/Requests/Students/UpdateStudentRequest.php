<?php

namespace App\Http\Requests\Students;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

class UpdateStudentRequest  extends FormRequest
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
        $currentRoute = Route::currentRouteName();

        $student = request()->route('student');

        $rules = [
            'firstname' => 'required|string|max:500',
            'lastname' => 'required|string|max:500',
            'class' => 'required|integer',
            
            'onhold' => 'required|boolean',

            'school_id' => 'required|exists:schools,id',

            'edit_image' => 'required|boolean',
            'file' => 'required_if:edit_image,true|file|mimes:jpeg,png'    
        ];

        if ($currentRoute === 'students.update') {
            $rules['academic_year_id'] = 'required|exists:academic_years,id';
            $rules['father_id'] = 'required|exists:fathers,id';
            $rules['nfc_id'] = 'nullable|string|unique:students,nfc_id,'.$student->id;
            $rules['face_id'] = 'nullable|string|unique:students,face_id,'.$student->id;
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
