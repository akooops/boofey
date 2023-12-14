<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Coupon;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;

class StudentHasNotUsedCoupon implements Rule
{
    protected $studentId;

    public function __construct($studentId)
    {
        $this->studentId = $studentId;
    }

    public function passes($attribute, $value)
    {
        $coupon = Coupon::where('id', $value)->orWhere('code', $value)->first();

        if ($coupon) {
            $student = Student::findOrFail($this->studentId);
            return $student ? !$student->usedCoupons()->where('coupon_id', $coupon->id)->exists() : false;
        }

        return false;
    }

    public function message()
    {
        return __('translations.coupon_already_used');
    }
}
