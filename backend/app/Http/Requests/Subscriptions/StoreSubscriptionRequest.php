<?php

namespace App\Http\Requests\Subscriptions;

use App\Rules\CanSubscribe;
use App\Rules\DiscountRule;
use App\Rules\UniqueUnexpiredSubscription;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

class StoreSubscriptionRequest extends FormRequest
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
            'package_id' => 'required|exists:packages,id',

            'tax' => 'required|numeric|min:0',

            'apply_discount' => 'required|boolean',
            'apply_coupon' => 'required_if:apply_discount,true|boolean',

            'discount' => ['numeric', 'min:0', new DiscountRule()],
            'coupon_id' => ['numeric', 'min:0', new DiscountRule()],            

            'exclude_from_calculation' => 'required|boolean',

            /*
            'should_start_later' => 'required|boolean',
            'should_start_at' => 'required_if:should_start_later,true|nullable|date_format:Y-m-d',
            */
        ];

        if ($currentRoute === 'subscriptions.store') {
            $rules['student_id'] = [
                'required',
                'exists:students,id',
                new CanSubscribe(),
            ];
        }else{
            $student = $this->route('student')->id;

            $this->merge([
                'student_id' => $student
            ]);

            $rules['student_id'] = [
                new CanSubscribe(),
            ];
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
