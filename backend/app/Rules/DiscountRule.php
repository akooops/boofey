<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class DiscountRule implements Rule
{
    public function passes($attribute, $value)
    {
        $applyDiscount = request()->input('apply_discount');
        $applyCoupon = request()->input('apply_coupon');

        // Check the conditions for both discount and coupon_id fields to be required
        return ($applyDiscount === true && $applyCoupon === false) || ($applyDiscount === false && $applyCoupon === true);
    }

    public function message()
    {
        return 'The discount field is required when apply_discount is true and apply_coupon is false. The coupon_id field is required when apply_discount is false and apply_coupon is true.';
    }
}
