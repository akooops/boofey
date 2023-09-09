<?php

namespace App\Http\Requests\Subscriptions;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class UpdateSubscriptionRequest extends FormRequest
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
            'package_id' => 'required|numeric',
            'should_start_at' => 'sometimes|date_format:Y-m-d|after:today',
            'use_package_info' => 'required|boolean',

            'balance' => 'required|integer',

            'update_prices' => 'required|boolean',

            'days' => 'required_if:use_package_info,false|integer',
            'tax' => 'required_if:use_package_info,false|required_if:update_prices,true|numeric',

            'apply_coupon' => 'required|required_if:update_prices,true|boolean',
            'coupon_id' => 'required_if:apply_coupon,true|required_if:update_prices,true|numeric',

            'subtotal' => 'required_if:use_package_info,false|required_if:update_prices,true|numeric',
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
