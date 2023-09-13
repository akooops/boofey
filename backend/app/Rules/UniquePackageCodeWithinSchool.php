<?php

namespace App\Rules;

use App\Models\Package;
use Illuminate\Contracts\Validation\Rule;

class UniquePackageCodeWithinSchool implements Rule
{
    protected $schoolId;
    protected $ignoreId;

    public function __construct($schoolId, $ignoreId = null)
    {
        $this->schoolId = $schoolId;
        $this->ignoreId = $ignoreId;
    }

    public function passes($attribute, $value)
    {
        $query = Package::where('school_id', $this->schoolId)
            ->where('code', $value);

        if ($this->ignoreId) {
            $query->where('id', '!=', $this->ignoreId);
        }

        return !$query->exists();
    }

    public function message()
    {
        return 'The package code should be unique within the same school packages.';
    }
}
