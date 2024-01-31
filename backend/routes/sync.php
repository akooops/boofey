<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\ModelNotFoundException;

Route::group(['prefix' => 'sync', 'namespace' => 'App\Http\Controllers\Sync', 'middleware' => ['verify.apikey', 'throttle:1000,1']], function() {
    Route::get('/', 'SyncController@sync')->name('sync');
    Route::get('/students', 'SyncController@syncStudents')->name('students.sync');
    Route::post('/queues', 'SyncController@queues')->name('queues.sync');
    Route::post('/students/{student}/nfc', 'SyncController@nfc')->name('api.nfc.sync');
    Route::post('/students/{student}/face', 'SyncController@face')->name('api.face.sync');
});