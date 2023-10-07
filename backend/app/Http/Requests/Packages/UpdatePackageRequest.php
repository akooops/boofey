<?php

namespace App\Http\Requests\Packages;

use App\Models\Package;
use App\Rules\UniquePackageCodeWithinSchool;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class UpdatePackageRequest extends FormRequest
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
        $package = $this->route('package');

        return [
            'name' => 'required|string|max:500',
            'name_ar' => 'required|string|max:500',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',

            'code' => [
                'required',
                'string',
                'max:500',
                new UniquePackageCodeWithinSchool($package->school_id, $package->id),
            ],

            'sale_price' => 'nullable|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',

            'yearly' => 'required|boolean',
            'hidden' => 'required|boolean',

            'days' => 'required_if:yearly,false|integer',

            'popular' => 'required|boolean',

            'features' => 'required',
            'features.*.id' => 'nullable|integer',
            'features.*.name_ar' => 'required|string|max:1000',
            'features.*.name' => 'required|string|max:1000',
            'features.*.checked' => 'required|boolean',
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
