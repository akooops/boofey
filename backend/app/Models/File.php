<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $appends = ["full_path"];

    protected $fillable = [
        'path',
        'original_name',
        'current_name',
    ];

    function getFullPathAttribute() {  
        return $this->path .'/'.$this->current_name;
    }
}
