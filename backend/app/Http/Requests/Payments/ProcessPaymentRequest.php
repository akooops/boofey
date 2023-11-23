<?php

namespace App\Http\Requests\Payments;

use App\Rules\SubscriptionIsInitiated;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class ProcessPaymentRequest extends FormRequest
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
            'customer_ip' => 'required|ip',
            'customer_email' => 'required|email',

            'payment_method_id' => 'required|exists:payment_methods,id',
            'billing_id' => 'required|exists:billings,id',

            'subscription_id' => ['required', 'exists:subscriptions,id', new SubscriptionIsInitiated()],
            'coupon_id' => 'nullable|exists:coupons,id',
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
