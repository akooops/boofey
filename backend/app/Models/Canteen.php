<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

class Canteen extends Model
{
    use HasFactory;

    protected $appends = ['display_name', 'display_address'];

    protected $fillable = [
        'name',
        'name_ar',
        'address',
        'address_ar',
        'school_id',
        'api_key'
    ];

    protected $hidden = [
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

    public function currentQueue(){
        return $this->hasOne(Queue::class, 'canteen_id', 'id')->where('started_at', '!=', NULL)->where('closed_at', NULL);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'canteens_users');
    }

    public function generateApiKey(){
        $apiKey = Str::random(64); 

        $this->update(['api_key' => $apiKey]);
    }

    public function getDecryptedKey(){
        return $this->api_key;
    }

    public function revokeApiKey(){
        $this->update(['api_key' => NULL]);
    }

    public function getDisplayNameAttribute(){
        if (session()->has('local')) {
            $local = session('local');

            if ($local === 'ar') {
                return $this->name_ar;
            }
        }

        return $this->name;
    }

    public function getDisplayAddressAttribute(){
        if (session()->has('local')) {
            $local = session('local');

            if ($local === 'ar') {
                return $this->address_ar;
            }
        }

        return $this->address;
    }
}
