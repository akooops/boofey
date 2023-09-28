<?php

use App\Http\Controllers\PaymentController;
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

include __DIR__ . '/auth.php';
include __DIR__ . '/admin.php';
include __DIR__ . '/sync.php';

Route::group(['namespace' => 'App\Http\Controllers', 'middleware' => ['auth:sanctum', 'convert.bool.string']], function(){    
    Route::get('profiles', 'ProfilesController@show')->name('profile.show');
    Route::post('profiles', 'ProfilesController@update')->name('update.update');
    Route::post('passwordReset', 'ProfilesController@passwordReset')->name('profile.passwordReset');
});

Route::group(['namespace' => 'App\Http\Controllers', 'middleware' => [/*'auth:sanctum', */'convert.bool.string']], function(){ 
    /* -------------------------------------------------------------------------------- */
    /* Schools Routes */
    Route::get('schools', 'SchoolsController@index')->name('parents.schools.index');
    
    Route::get('schools/{school}/academicYears', 'AcademicYearsController@indexBySchool')->name('parents.academicYears.indexBySchool');
    Route::get('academicYears', 'AcademicYearsController@index')->name('parents.academicYears.index');

    Route::get('schools/{school}/packages', 'PackagesController@indexBySchool')->name('parents.packages.indexBySchool');

    /* -------------------------------------------------------------------------------- */
    /* Students Routes */
    Route::resource('students', StudentsController::class)->except(['create', 'store', 'edit', 'update'])->names([
        'index' => 'parent.students.index',
        'show' => 'parent.students.show',
        'destroy' => 'parent.students.destroy',
    ]);

    Route::post('students', 'StudentsController@store')->name('parents.students.store');
    Route::post('students/{student}/update', 'StudentsController@update')->name('parents.students.update');
    Route::post('students/{student}/otp', 'StudentsController@otp')->name('parents.students.otp');

    /* -------------------------------------------------------------------------------- */
    /* Subscriptions Routes */
    Route::get('students/{student}/subscriptions', 'SubscriptionsController@index')->name('parents.students.index');

    /* -------------------------------------------------------------------------------- */
    /* Billing Routes */
    Route::resource('billings', BillingsController::class)->except(['create', 'edit', 'update']);
    Route::post('billings/{billing}/update', 'BillingsController@update')->name('parents.billings.update');
});
