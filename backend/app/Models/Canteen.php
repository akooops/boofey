<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

class Canteen extends Model
{
    use HasFactory;

    protected $appends = ['status'];

    protected $fillable = [
        'name',
        'name_ar',
        'address',
        'address_ar',
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

    public function orders()
    {
        return $this->hasMany(Order::class, 'canteen_id', 'id');
    }

    public function currentQueue(){
        $today = Carbon::today();

        return $this->hasOne(Queue::class, 'canteen_id', 'id')->whereDate('started_at', $today)->where('closed_at', NULL);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'canteen_users');
    }

    /* Methods
        --------------------------------------------------------------------
    */

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

    public function countQueueStudents($type, $year, $month = null, $day = null)
    {
        $queues = $this->queues();

        if ($type === 'year') {
            $queues->whereYear('started_at', $year);
        } elseif ($type === 'month') {
            $queues->whereYear('started_at', $year)
                ->whereMonth('started_at', $month);
        } else {
            $queues->whereYear('started_at', $year)
                ->whereMonth('started_at', $month)
                ->whereDay('started_at', $day);
        }

        $queues = $queues->get();

        $count = $queues->flatMap(function ($queue) {
            return $queue->queueStudents;
        })->count();

        return ($count === null) ? 0 : $count;
    }

    public function averageStudentTimeDifferenceInMinutes($type, $year, $month = null, $day = null)
    {
        $queues = $this->queues();

        if ($type === 'year') {
            $queues->whereYear('started_at', $year);
        } elseif ($type === 'month') {
            $queues->whereYear('started_at', $year)
                ->whereMonth('started_at', $month);
        } else {
            $queues->whereYear('started_at', $year)
                ->whereMonth('started_at', $month)
                ->whereDay('started_at', $day);
        }

        $queues = $queues->get();

        $students = $queues->flatMap(function ($queue) {
            return $queue->queueStudents;
        });

        $students = $students->filter(function ($student) {
            return $student->started_at && $student->exited_at;
        });

        $average = $students->avg(function ($student) {
            return $student->started_at->diffInMinutes($student->exited_at);
        });

        return ($average === null) ? 0 : round($average, 2);
    }

    /* Appends
        --------------------------------------------------------------------
    */

    public function getStatusAttribute(){
        return (is_null($this->currentQueue)) ? 'closed': 'open';
    }
}
