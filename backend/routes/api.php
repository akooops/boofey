<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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

Route::group(['namespace' => 'App\Http\Controllers\Api', 'middleware' => [/*'auth:sanctum',*/ 'convert.bool.string']], function(){    
    /* -------------------------------------------------------------------------------- */
    /* Permissions Routes */
    Route::post('permissions/{permission}/update', [PermissionsController::class, 'update'])->name('roles.update');
    Route::resource('permissions', 'PermissionsController@update')->except(['create', 'edit', 'update']);

    /* -------------------------------------------------------------------------------- */
    /* Roles Routes */
    Route::resource('roles', RolesController::class)->except(['create', 'edit', 'update']);
    Route::post('roles/{role}/update', 'RolesController@update')->name('roles.update');

    /* -------------------------------------------------------------------------------- */
    /* Users Routes */
    Route::resource('users', UsersController::class)->except(['create', 'edit', 'update']);
    Route::post('users/{user}/update', 'UsersController@update')->name('users.update');

    /* -------------------------------------------------------------------------------- */
    /* Profiles Routes */
    Route::get('profiles', 'ProfilesController@update')->name('profiles.update');
    Route::post('profiles/{profile}/update', 'ProfilesController@update')->name('profiles.update');

    /* -------------------------------------------------------------------------------- */
    /* Schools Routes */
    Route::resource('schools', SchoolsController::class)->except(['create', 'edit', 'update']);
    Route::post('schools/{school}/update', 'SchoolsController@update')->name('schools.update');


    /* -------------------------------------------------------------------------------- */
    /* Acedmic Years Routes */
    Route::get('schools/{school}/academicYears', 'AcademicYearsController@indexBySchool')->name('academicYears.indexBySchool');
    Route::post('schools/{school}/academicYears', 'AcademicYearsController@storeBySchool')->name('academicYears.storeBySchool');

    Route::resource('academicYears', AcademicYearsController::class)->except(['create', 'edit', 'update']);
    Route::post('academicYears/{academicYear}/update', 'AcademicYearsController@update')->name('academicYears.update');

    /* -------------------------------------------------------------------------------- */
    /* Acedmic Breaks Routes */
    Route::get('academicYears/{academicYear}/academicBreaks', 'AcademicBreaksController@index')->name('academicBreaks.index');
    Route::post('academicYears/{academicYear}/academicBreaks', 'AcademicBreaksController@store')->name('academicBreaks.store');

    Route::resource('academicBreaks', AcademicBreaksController::class)->only(['show', 'destroy']);
    Route::post('academicBreaks/{academicBreak}/update', 'AcademicBreaksController@update')->name('academicBreaks.update');

    /* -------------------------------------------------------------------------------- */
    /* Packages Routes */
    Route::get('schools/{school}/packages', 'PackagesController@indexBySchool')->name('packages.indexBySchool');
    Route::post('schools/{school}/packages', 'PackagesController@storeBySchool')->name('packages.storeBySchool');

    Route::resource('packages', PackagesController::class)->except(['create', 'edit', 'update']);
    Route::post('packages/{package}/update', 'PackagesController@update')->name('packages.update');

    /* -------------------------------------------------------------------------------- */
    /* Canteens Routes */
    Route::get('schools/{school}/canteens', 'CanteensController@indexBySchool')->name('canteens.indexBySchool');
    Route::post('schools/{school}/canteens', 'CanteensController@storeBySchool')->name('canteens.storeBySchool');

    Route::resource('canteens', CanteensController::class)->except(['create', 'edit', 'update']);
    Route::post('canteens/{canteen}/update', 'CanteensController@update')->name('canteens.update');
    Route::post('canteens/{canteen}/generate', 'CanteensController@generate')->name('canteens.generate');
    Route::post('canteens/{canteen}/revoke', 'CanteensController@revoke')->name('canteens.revoke');

    /* -------------------------------------------------------------------------------- */
    /* Fathers Routes */
    Route::resource('fathers', FathersController::class)->except(['create', 'edit', 'update']);
    Route::post('fathers/{father}/update', 'FathersController@update')->name('fathers.update');

    /* -------------------------------------------------------------------------------- */
    /* Students Routes */
    Route::get('schools/{school}/students', 'StudentsController@indexBySchool')->name('students.indexBySchool');
    Route::post('schools/{school}/students', 'StudentsController@storeBySchool')->name('students.storeBySchool');

    Route::resource('students', StudentsController::class)->except(['create', 'edit', 'update']);
    Route::post('students/{student}/update', 'StudentsController@update')->name('students.update');
    Route::post('students/{student}/otp', 'StudentsController@otp')->name('students.otp');

    /* -------------------------------------------------------------------------------- */
    /* Subscriptions Routes */
    Route::get('students/{student}/subscriptions', 'SubscriptionsController@index')->name('students.index');
    Route::post('students/{student}/subscriptions', 'SubscriptionsController@store')->name('students.store');

    Route::resource('subscriptions', SubscriptionsController::class)->only(['show', 'destroy']);
    Route::post('subscriptions/{subscription}/update', 'SubscriptionsController@update')->name('subscriptions.update');

    /* ------------------------------------ */

    Route::group(['prefix' => 'canteens'], function() {
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

    /* -------------------------------------------------------------------------------- */
    /* Coupons Routes */
    Route::resource('coupons', CouponsController::class)->except(['create', 'edit', 'update']);
    Route::post('coupons/{coupon}/update', 'CouponsController@update')->name('coupons.update');

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