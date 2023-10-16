<?php

namespace App\Http\Requests\Subscriptions;

use App\Rules\CanEnableSubscription;
use App\Rules\CanSubscribe;
use App\Rules\SubscriptionIsEnabled;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class EnableSubscriptionRequest extends FormRequest
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
        $student = $subscription->student_id;
        $package = $subscription->package_id;

        $this->merge([
            'student_id' => $student,
            'subscription_id' => $subscription->id
        ]);

        $rules = []; 

        $rules['subscription_id'] = [
            'required',
            'exists:subscriptions,id',
            new SubscriptionIsEnabled(),
        ];

        $rules['student_id'] = [
            'required',
            'exists:students,id',
            new CanEnableSubscription($student, $package),
        ];

        return $rules;
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new ValidationException($validator, $this->buildFailedValidationResponse($validator));
    }

    protected function buildFailedValidationResponse(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $errors = $validator->errors();
    
        if ($errors->has('subscription_id')) {
            $subscriptionErrors = $errors->get('subscription_id');
            $errors = new \Illuminate\Support\MessageBag(['subscription_id' => $subscriptionErrors]);
        }

        return new JsonResponse([
            'status' => 'error',
            'errors' => $errors,
        ], 422);
    }
}
