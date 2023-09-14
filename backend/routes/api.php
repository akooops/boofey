<?php

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

Route::group(['namespace' => 'App\Http\Controllers\Api', 'middleware' => ['auth:sanctum', 'convert.bool.string']], function(){    
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

    Route::group(['prefix' => 'profiles'], function() {
        Route::get('/', 'ProfilesController@show')->name('api.profiles.show');
        Route::post('/update', 'ProfilesController@update')->name('api.profiles.update');
    });

    Route::group(['prefix' => 'schools'], function() {
        Route::get('/', 'SchoolsController@index')->name('api.schools.index');
        Route::get('/{school}', 'SchoolsController@show')->name('api.schools.show');
        Route::post('/store', 'SchoolsController@store')->name('api.schools.store');
        Route::post('/{school}/update', 'SchoolsController@update')->name('api.schools.update');
        Route::delete('/{school}/destroy', 'SchoolsController@destroy')->name('api.schools.destroy');

        Route::get('/{school}/academicYears', 'AcademicYearsController@index')->name('api.academicYears.index');
        Route::post('/{school}/academicYears/store', 'AcademicYearsController@store')->name('api.academicYears.store');

        Route::get('/{school}/packages', 'PackagesController@index')->name('api.packages.index');
        Route::post('/{school}/packages/store', 'PackagesController@store')->name('api.packages.store');

        Route::get('/{school}/canteens', 'CanteensController@index')->name('api.canteens.index');
        Route::post('/{school}/canteens/store', 'CanteensController@store')->name('api.canteens.store');
    });

    Route::group(['prefix' => 'academicYears'], function() {
        Route::get('/{academicYear}', 'AcademicYearsController@show')->name('api.academicYears.show');
        Route::post('/{academicYear}/update', 'AcademicYearsController@update')->name('api.academicYears.update');
        Route::delete('/{academicYear}/destroy', 'AcademicYearsController@destroy')->name('api.academicYears.destroy');

        Route::get('/{academicYear}/academicBreaks', 'AcademicBreaksController@index')->name('api.academicBreaks.index');
        Route::post('/{academicYear}/academicBreaks/store', 'AcademicBreaksController@store')->name('api.academicBreaks.store');
    });

    Route::group(['prefix' => 'academicBreaks'], function() {
        Route::get('/{academicBreak}', 'AcademicBreaksController@show')->name('api.academicBreak.show');
        Route::post('/{academicBreak}/update', 'AcademicBreaksController@update')->name('api.academicBreak.update');
        Route::delete('/{academicBreak}/destroy', 'AcademicBreaksController@destroy')->name('api.academicBreak.destroy');
    });

    Route::group(['prefix' => 'packages'], function() {
        Route::get('/{package}', 'PackagesController@show')->name('api.packages.show');
        Route::post('/{package}/update', 'PackagesController@update')->name('api.packages.update');
        Route::delete('/{package}/destroy', 'PackagesController@destroy')->name('api.packages.destroy');
    });

    Route::group(['prefix' => 'fathers'], function() {
        Route::get('/', 'FathersController@index')->name('api.fathers.index');
        Route::get('/{father}', 'FathersController@show')->name('api.fathers.show');
        Route::post('/store', 'FathersController@store')->name('api.fathers.store');
        Route::post('/{father}/update', 'FathersController@update')->name('api.fathers.update');
        Route::delete('/{father}/destroy', 'FathersController@destroy')->name('api.fathers.destroy');
    });

    Route::group(['prefix' => 'students'], function() {
        Route::get('/', 'StudentsController@index')->name('api.students.index');
        Route::get('/{student}', 'StudentsController@show')->name('api.students.show');
        Route::post('/store', 'StudentsController@store')->name('api.students.store');
        Route::post('/{student}/update', 'StudentsController@update')->name('api.students.update');
        Route::delete('/{student}/destroy', 'StudentsController@destroy')->name('api.students.destroy');

        Route::get('/{student}/subscriptions', 'SubscriptionsController@index')->name('api.subscriptions.index');
        Route::post('/{student}/subscriptions/store', 'SubscriptionsController@store')->name('api.subscriptions.store');
    });

    Route::group(['prefix' => 'subscriptions'], function() {
        Route::get('/{subscription}', 'SubscriptionsController@show')->name('api.subscriptions.show');
        Route::post('/{subscription}/update', 'SubscriptionsController@update')->name('api.subscriptions.update');
        Route::delete('/{subscription}/destroy', 'SubscriptionsController@destroy')->name('api.students.destroy');;
    });

    Route::group(['prefix' => 'canteens'], function() {
        Route::get('/{canteen}', 'CanteensController@show')->name('api.canteens.show');
        Route::post('/{canteen}/update', 'CanteensController@update')->name('api.canteens.update');
        Route::post('/{canteen}/generate', 'CanteensController@generate')->name('api.canteens.generate');
        Route::post('/{canteen}/revoke', 'CanteensController@revoke')->name('api.canteens.revoke');
        Route::delete('/{canteen}/destroy', 'CanteensController@destroy')->name('api.canteens.destroy');

        Route::get('/{canteen}/queues', 'QueuesController@index')->name('api.queues.index');
        Route::post('/{canteen}/queues/store', 'QueuesController@store')->name('api.queues.store');
    });

    Route::group(['prefix' => 'queues'], function() {
        Route::get('/{queue}', 'QueuesController@show')->name('api.queues.show');
        Route::post('/{queue}/update', 'QueuesController@update')->name('api.queues.update');
        Route::delete('/{queue}/destroy', 'QueuesController@destroy')->name('api.queues.destroy');

        Route::get('/{queue}/queueStudents', 'QueueStudentsController@index')->name('api.queueStudents.index');
        Route::post('/{queue}/queueStudents/store', 'QueueStudentsController@store')->name('api.queueStudents.store');
    });

    Route::group(['prefix' => 'queueStudents'], function() {
        Route::get('/{queueStudent}', 'QueueStudentsController@show')->name('api.queueStudents.show');
        Route::post('/{queueStudent}/update', 'QueueStudentsController@update')->name('api.queueStudents.update');
        Route::delete('/{queueStudent}/destroy', 'QueueStudentsController@destroy')->name('api.queueStudents.destroy');

        Route::post('/exit', 'QueueStudentsController@exit')->name('api.queueStudents.exit');
    });

    Route::group(['prefix' => 'coupons'], function() {
        Route::get('/', 'CouponsController@index')->name('api.coupons.index');
        Route::get('/{coupon}', 'CouponsController@show')->name('api.coupons.show');
        Route::post('/store', 'CouponsController@store')->name('api.coupons.store');
        Route::post('/{coupon}/update', 'CouponsController@update')->name('api.coupons.update');
        Route::delete('/{coupon}/destroy', 'CouponsController@destroy')->name('api.coupons.destroy');
    });

    Route::get('authenticated', 'AuthController@authenticated');
    Route::post('logout', 'AuthController@logout');
});


Route::group(['prefix' => 'sync', 'namespace' => 'App\Http\Controllers\Api', 'middleware' => ['verify.apikey']], function() {
    Route::get('/', 'SyncController@sync')->name('api.students.sync');
    Route::post('/queues/{queue}', 'SyncController@queues')->name('api.queues.sync');
    Route::post('/students/{student}/nfc', 'SyncController@nfc')->name('api.nfc.sync');
    Route::post('/students/{student}/face', 'SyncController@face')->name('api.face.sync');
});

Route::group(['namespace' => 'App\Http\Controllers\Api', 'middleware' => ['convert.bool.string']], function(){  
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('password/email', 'AuthController@sendResetLinkEmail');
    Route::post('password/reset', 'AuthController@reset');

    Route::post('tokens/refresh', 'AuthController@refreshTokens');
});