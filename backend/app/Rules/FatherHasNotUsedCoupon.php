<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Coupon;
use Illuminate\Support\Facades\Auth;

class FatherHasNotUsedCoupon implements Rule
{
    public function passes($attribute, $value)
    {
        $coupon = Coupon::where('code', $value)->first();

        if ($coupon) {
            $father = Auth::user()->father;
            return $father ? !$father->usedCoupons()->where('coupon_id', $coupon->id)->exists() : false;
        }

        return false;
    }

    public function message()
    {
        return __('translations.coupon_already_used');
    }
}
