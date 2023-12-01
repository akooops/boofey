<?php

namespace App\Http\Requests\Fathers;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class UpdateFatherRequest extends FormRequest
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
        $father = request()->route('father');

        return [
            'firstname' => 'required|string|max:500',
            'lastname' => 'required|string|max:500',
            'identity_number' => 'required|numeric|size:10|unique:fathers,identity_number,'.$father->identity_number,
            'username' => 'required|username|unique:users,username,'.$father->user->id,
            'email' => 'required|email|unique:users,email,'.$father->user->id,
            'phone' => 'required|phone|unique:users,phone,'.$father->user->id,
            'edit_password' => 'required|boolean',
            'password' => 'required_if:edit_password,true|password|confirmed',
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
