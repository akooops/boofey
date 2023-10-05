<?php

namespace App\Http\Requests\Packages;

use App\Models\School;
use App\Rules\UniquePackageCodeWithinSchool;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

class StorePackageRequest extends FormRequest
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

        $rules = [
            'name' => 'required|string|max:500',
            'description' => 'nullable|string',

            'sale_price' => 'nullable|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',

            'yearly' => 'required|boolean',
            'hidden' => 'required|boolean',

            'days' => 'required_if:yearly,false|integer',

            'popular' => 'required|boolean',

            'features' => 'required',
            'features.*.name' => 'required|string|max:1000',
            'features.*.checked' => 'required|boolean',
        ];

        $school = null;

        if ($currentRoute === 'packages.store') {
            $rules['school_id'] = 'required|exists:schools,id'; 
            $school = $this->get('school_id');
        }else{
            $school = $this->route('school')->id;
        }

        $rules['code'] = [
            'required',
            'string',
            'max:500',
            new UniquePackageCodeWithinSchool($school),
        ];

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
