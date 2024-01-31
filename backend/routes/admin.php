<?php

use App\Http\Controllers\Admin\QueuesController;
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

Route::group(['prefix' => 'admin', 'namespace' => 'App\Http\Controllers\Admin', 'middleware' => ['auth:sanctum', 'permission', 'convert.bool.string', 'verified']], function(){    
    /* -------------------------------------------------------------------------------- */
    /* Permissions Routes */
    Route::resource('permissions', PermissionsController::class)->except(['create', 'edit', 'update']);
    Route::post('permissions/{permission}/update', 'PermissionsController@update')->name('permissions.update');

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
    /* Divisions Routes */
    Route::get('schools/{school}/divisions', 'DivisionsController@index')->name('divisions.index');
    Route::post('schools/{school}/divisions', 'DivisionsController@store')->name('divisions.store');

    Route::resource('divisions', DivisionsController::class)->except(['create', 'edit', 'update']);
    Route::post('divisions/{division}/update', 'DivisionsController@update')->name('divisions.update');

    /* -------------------------------------------------------------------------------- */
    /* Canteens Routes */
    Route::get('schools/{school}/canteens', 'CanteensController@indexBySchool')->name('canteens.indexBySchool');
    Route::post('schools/{school}/canteens', 'CanteensController@storeBySchool')->name('canteens.storeBySchool');

    Route::resource('canteens', CanteensController::class)->except(['create', 'edit', 'update']);
    Route::post('canteens/{canteen}/update', 'CanteensController@update')->name('canteens.update');
    Route::post('canteens/{canteen}/generate', 'CanteensController@generate')->name('canteens.generate');
    Route::post('canteens/{canteen}/revoke', 'CanteensController@revoke')->name('canteens.revoke');

    /* -------------------------------------------------------------------------------- */
    /* Canteens Users Routes */
    Route::get('getCanteens', 'CanteenUsersController@getCanteens')->name('canteens.getCanteens');
    Route::get('users/{user}/canteens', 'CanteenUsersController@index')->name('canteens.index');
    Route::post('users/{user}/canteens', 'CanteenUsersController@store')->name('canteenUsers.store');

    Route::resource('canteenUsers', CanteenUsersController::class)->only(['show', 'destroy']);

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
    Route::get('students/{student}/subscriptions', 'SubscriptionsController@indexByStudent')->name('subscriptions.indexByStudent');
    Route::post('students/{student}/subscriptions', 'SubscriptionsController@storeByStudent')->name('subscriptions.storeByStudent');

    Route::resource('subscriptions', SubscriptionsController::class)->only(['index', 'store', 'show']);
    Route::post('subscriptions/{subscription}/update', 'SubscriptionsController@update')->name('subscriptions.update');
    Route::post('subscriptions/{subscription}/enable', 'SubscriptionsController@enable')->name('subscriptions.enable');
    Route::post('subscriptions/{subscription}/disable', 'SubscriptionsController@disable')->name('subscriptions.disable');
    Route::post('subscriptions/{subscription}/generateInvoice', 'SubscriptionsController@generateInvoice')->name('subscriptions.generateInvoice');

    /* -------------------------------------------------------------------------------- */
    /* Invoices Routes */
    Route::resource('invoices', InvoicesController::class)->only(['index', 'show']);

    /* -------------------------------------------------------------------------------- */
    /* Payments Routes */
    Route::resource('payments', PaymentsController::class)->only(['index', 'show']);
    
    /* -------------------------------------------------------------------------------- */
    /* Queues Routes */
    Route::get('canteens/{canteen}/queues', 'QueuesController@index')->name('queues.index');
    Route::post('canteens/{canteen}/queues', 'QueuesController@store')->name('queues.store');

    Route::resource('queues', QueuesController::class)->only(['show', 'destroy']);
    Route::post('queues/{queue}/update', 'QueuesController@update')->name('queues.update');
    Route::post('queues/{queue}/close', 'QueuesController@close')->name('queues.close');
    Route::post('canteens/{canteen}/qr/exit', 'QueuesController@exit')->name('queues.exit');

    /* -------------------------------------------------------------------------------- */
    /* Queues Students Routes */
    Route::get('queues/{queue}/queueStudents', 'QueueStudentsController@index')->name('queueStudents.index')->middleware('throttle:5,0.15');
    Route::post('queues/{queue}/queueStudents', 'QueueStudentsController@store')->name('queueStudents.store');

    Route::resource('queueStudents', QueueStudentsController::class)->only(['show', 'destroy']);
    Route::post('queueStudents/{queueStudent}/update', 'QueueStudentsController@update')->name('queueStudents.update');
    Route::post('queueStudents/{queueStudent}/exit', 'QueueStudentsController@exit')->name('queueStudents.exit');

    /* -------------------------------------------------------------------------------- */
    /* Coupons Routes */
    Route::resource('coupons', CouponsController::class)->except(['create', 'edit', 'update']);
    Route::post('coupons/{coupon}/update', 'CouponsController@update')->name('coupons.update');

    /* -------------------------------------------------------------------------------- */
    /* Categories Routes */
    Route::resource('categories', CategoriesController::class)->except(['create', 'edit', 'update']);
    Route::post('categories/{category}/update', 'CategoriesController@update')->name('categories.update');

    /* -------------------------------------------------------------------------------- */
    /* Products Routes */
    Route::resource('products', ProductsController::class)->except(['create', 'edit', 'update']);
    Route::post('products/{product}/update', 'ProductsController@update')->name('products.update');

    /* -------------------------------------------------------------------------------- */
    /* Orders Routes */
    Route::get('canteens/{canteen}/orders', 'OrdersController@index')->name('orders.index');
    Route::post('canteens/{canteen}/orders', 'OrdersController@store')->name('orders.store');

    Route::resource('orders', OrdersController::class)->only(['destroy']);
    Route::get('orders/{order}', 'OrdersController@show')->name('orders.show')->withoutMiddleware(['auth:sanctum', 'permission', 'convert.bool.string', 'verified']);
    Route::post('orders/{order}/update', 'OrdersController@update')->name('orders.update');

    /* -------------------------------------------------------------------------------- */
    /* Dashboards Routes */
    Route::get('dashboards/count', 'DashboardsController@count')->name('dashboards.count');
    Route::get('dashboards/lastSubscribedStudents', 'DashboardsController@lastSubscribedStudents')->name('dashboards.lastSubscribedStudents');
    Route::get('dashboards/absentStudents', 'DashboardsController@absentStudents')->name('dashboards.absentStudents');
    Route::get('dashboards/expiringSoonStudents', 'DashboardsController@expiringSoonStudents')->name('dashboards.expiringSoonStudents');
    Route::get('dashboards/pendingStudents', 'DashboardsController@pendingStudents')->name('dashboards.pendingStudents');
    Route::get('dashboards/canteensStatus', 'DashboardsController@canteensStatus')->name('dashboards.canteensStatus');
    Route::get('dashboards/dailyTotal', 'DashboardsController@dailyTotal')->name('dashboards.dailyTotal');

    Route::get('dashboards/doneByCanteens/{canteen}', 'DashboardsController@doneByCanteens')->name('dashboards.doneByCanteens');
    Route::get('dashboards/avgByCanteens/{canteen}', 'DashboardsController@avgByCanteens')->name('dashboards.avgByCanteens');

    Route::get('reports/todaySubscribers/{school}', 'ReportsController@todaySubscribers')->name('reports.todaySubscribers');
    Route::get('reports/subsriptionStatus', 'ReportsController@subsriptionStatus')->name('reports.subsriptionStatus');
    Route::get('reports/revenues', 'ReportsController@revenues')->name('reports.revenues');

    Route::post('sms', 'SMSController@sendSMS')->name('sms.sendSMS');
    Route::post('sms/parents', 'SMSController@sendParentsSMS')->name('sms.sendParentsSMS');
    Route::post('sms/condition', 'SMSController@sendByCondition')->name('sms.sendByCondition');
});

