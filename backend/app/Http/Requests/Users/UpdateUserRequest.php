<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'firstname' => 'required|string|max:500',
            'lastname' => 'required|string|max:500',
            'username' => 'required|username|unique:users,username,'.$this->user->id,
            'email' => 'required|email|unique:users,email,'.$this->user->id,
            'phone' => 'required|phone|unique:users,phone,'.$this->user->id,
            'password' => 'sometimes|required|password|confirmed',
        ];
    }
}
