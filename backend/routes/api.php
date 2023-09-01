<?php

use App\Http\Controllers\Api\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'App\Http\Controllers\Api'], function(){    
    Route::group(['prefix' => 'users'], function() {
        Route::get('/', 'UsersController@index')->name('api.users.index');
        Route::get('/{user}', 'UsersController@show')->name('api.users.show');
        Route::post('/store', 'UsersController@store')->name('api.users.store');
        Route::post('/{user}/update', 'UsersController@update')->name('api.users.update');
        Route::delete('/{user}/destroy', 'UsersController@destroy')->name('api.users.destroy');
    });

});
