<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

class Canteen extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'school_id',
        'api_key'
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function queues()
    {
        return $this->hasMany(Queue::class, 'canteen_id', 'id');
    }

    public function generateApiKey(){
        $apiKey = Str::random(64); 
        $encryptedApiKey = Crypt::encrypt($apiKey);

        $this->update(['api_key' => $encryptedApiKey]);
    }

    public function getDecryptedKey(){
        return Crypt::decrypt($this->api_key);
    }

    public function revokeApiKey(){
        $this->update(['api_key' => NULL]);
    }
}
