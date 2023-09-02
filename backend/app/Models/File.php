<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

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
        $baseUrl = URL::to('/');
        $uploadsPath = 'uploads';

        return $baseUrl . '/' . $uploadsPath . '/' . $this->path . '/' . $this->current_name;
    }
}
