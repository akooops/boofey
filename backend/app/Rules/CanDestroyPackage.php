<?php

namespace App\Rules;

use App\Models\Package;
use App\Models\School;
use App\Models\Student;
use App\Models\Subscription;
use Illuminate\Contracts\Validation\Rule;

class CanDestroyPackage implements Rule
{
    protected $packageId;

    public function __construct($packageId)
    {
        $this->packageId = $packageId;
    }


    public function passes($attribute, $value)
    {
        $package = Package::findOrFail($this->packageId);

        $subscriptions = Subscription::where('package_id', $package->id)
            ->whereIn('status', ['active', 'inactive']);

        return ($subscriptions->count() > 0) ? false : true;
    }

    public function message()
    {
        return __('translations.can_subscribe');
    }
}
