<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class DiscountRule implements Rule
{
    public function passes($attribute, $value)
    {
        $applyDiscount = request()->input('apply_discount');
        $applyCoupon = request()->input('apply_coupon');
        $discount = request()->input('discount');
        $coupon_id = request()->input('coupon_id');


        if($applyDiscount === false) return true;

        else if($applyCoupon === false && is_null($discount)) return false;
        else if($applyCoupon === true && is_null($coupon_id)) return false;


        return true;
    }

    public function message()
    {
        return 'The discount field is required when apply_discount is true and apply_coupon is false. The coupon_id field is required when apply_discount is false and apply_coupon is true.';
    }
}
