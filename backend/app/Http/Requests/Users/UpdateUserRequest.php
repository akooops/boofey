<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class UpdateUserRequest extends FormRequest
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
        $user = request()->route('user');

        return [
            'role_id' => 'required|numeric',
            'firstname' => 'required|string|max:500',
            'lastname' => 'required|string|max:500',
            'username' => 'required|username|unique:users,username,'.$user->id,
            'email' => 'required|email:rfc,dns|unique:users,email,'.$user->id,
            'phone' => 'required|phone|unique:users,phone,'.$user->id,
            'password' => 'nullable|required|password|confirmed',
            'verified' => 'required|boolean'
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
