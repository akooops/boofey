<?php

namespace App\Http\Requests\Packages;

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
        $package = request()->route('package');

        return [
            'name' => 'required|string|max:500',
            'code' => 'required|string|max:500|unique:packages,code,'.$package,
            'description' => 'sometimes|string',

            'sale_price' => 'sometimes|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'tax' => 'sometimes|numeric|min:0',

            'yearly' => 'required|boolean',
            'hidden' => 'required|boolean',

            'days' => 'required_if:yearly,false|integer',

            'popular' => 'required|boolean',

            'features' => 'required',
            'features.*.id' => 'sometimes|integer',
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
