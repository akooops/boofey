<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    use HasFactory;

    protected $fillable = [
        'from',
        'to',
        'current',
        'school_id',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
