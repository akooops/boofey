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
    Route::group(['prefix' => 'permissions'], function() {
        Route::get('/', 'PermissionsController@index')->name('api.permissions.index');
        Route::get('/{permission}', 'PermissionsController@show')->name('api.permissions.show');
        Route::post('/store', 'PermissionsController@store')->name('api.permissions.store');
        Route::post('/{permission}/update', 'PermissionsController@update')->name('api.permissions.update');
        Route::delete('/{permission}/destroy', 'PermissionsController@destroy')->name('api.permissions.destroy');
    });

    Route::group(['prefix' => 'roles'], function() {
        Route::get('/', 'RolesController@index')->name('api.roles.index');
        Route::get('/{role}', 'RolesController@show')->name('api.roles.show');
        Route::post('/store', 'RolesController@store')->name('api.roles.store');
        Route::post('/{role}/update', 'RolesController@update')->name('api.roles.update');
        Route::delete('/{role}/destroy', 'RolesController@destroy')->name('api.roles.destroy');
    });

    Route::group(['prefix' => 'users'], function() {
        Route::get('/', 'UsersController@index')->name('api.users.index');
        Route::get('/{user}', 'UsersController@show')->name('api.users.show');
        Route::post('/store', 'UsersController@store')->name('api.users.store');
        Route::post('/{user}/update', 'UsersController@update')->name('api.users.update');
        Route::delete('/{user}/destroy', 'UsersController@destroy')->name('api.users.destroy');
    });


});
