<?php

namespace App\Http\Requests\Payments;

use App\Models\Coupon;
use App\Rules\CouponValid;
use App\Rules\FatherHasNotUsedCoupon;
use App\Rules\IsFullDiscount;
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

            'subscription_id' => ['required', 'exists:subscriptions,id', new SubscriptionIsInitiated()],
            'coupon_id' => ['nullable', 'exists:coupons,id', new CouponValid(), new FatherHasNotUsedCoupon()]
        ];

        $coupon_id = $this->input('coupon_id');
        $coupon = Coupon::find($coupon_id);

        if(is_null($coupon) || (!is_null($coupon) && $coupon->discount != 100)){
            $rules['billing_id'] = ['required', 'exists:billings,id'];

            if($currentRoute === 'parents.payments.process') {
                $rules['payment_method_id'] = ['required' , 'exists:payment_methods,id'];
            }
        }

        if($currentRoute === 'parents.payments.processRedirection'){
            $rules['return_url'] = 'required';
            $rules['payment_method_id'] = 'nullable|exists:payment_methods,id';
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
