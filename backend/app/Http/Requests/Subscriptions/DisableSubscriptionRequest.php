<?php

namespace App\Http\Requests\Subscriptions;

use App\Rules\CanEnableSubscription;
use App\Rules\CanSubscribe;
use App\Rules\SubscriptionIsEnabled;
use App\Rules\SubscriptionIsExpired;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class DisableSubscriptionRequest extends FormRequest
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
        $subscription = $this->route('subscription');

        $this->merge([
            'subscription_id' => $subscription->id
        ]);

        $rules = []; 

        $rules['subscription_id'] = [
            'required',
            'exists:subscriptions,id',
            new SubscriptionIsExpired(),
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
            'errors' => $validator->errors()
        ], 422);
    }
}
