<?php

namespace App\Http\Requests\Students;

use App\Models\Student;
use App\Rules\CanChangeSchool;
use App\Rules\CanUpdateStudentImage;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Validator;

class UploadStudentFaceRequest  extends FormRequest
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
        $group = $this->route('group');

        $validator->after(function ($validator) use ($group){
            if ($group->isInRequest()) {
                $validator->errors()->add('group', 'This group cannot be deleted as it is being used in one or more fulfilment requests.');
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
