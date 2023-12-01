<?php

namespace App\Http\Requests\Payments;

use App\Rules\SubscriptionIsInitiated;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

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
        $currentRoute = Route::currentRouteName();

        $rules = [
            'language' => 'required|in:en,ar',
            'customer_ip' => 'required|ip',
            'customer_email' => 'required|email',

            'billing_id' => 'required|exists:billings,id',

            'subscription_id' => ['required', 'exists:subscriptions,id', new SubscriptionIsInitiated()],
            'coupon_id' => 'nullable|exists:coupons,id',
        ];

        if($currentRoute === 'parents.payments.process') {
            $rules['payment_method_id'] = 'required|exists:payment_methods,id';
        }

        if($currentRoute === 'parents.payments.processRedirection'){
            $rules['return_url'] = 'required';
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
