<?php

use App\Http\Controllers\AWSController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PayfortController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\SMSController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

/*
Route::get('payfort', [PayfortController::class, 'index'])->name('payfort');
Route::post('payfort', [PayfortController::class, 'paymentReturn'])->name('paymentReturn');

Route::get('calculateSignature', [PayfortController::class, 'calculateSignature'])->name('calculateSignature');

Route::get('testPayment', [PaymentsController::class, 'testPayment'])->name('testPayment');
Route::get('testSMS', [SMSController::class, 'testSMS'])->name('testSMS');

Route::get('payfort2', [PayfortController::class, 'index2'])->name('index2');
Route::post('payfort2', [PayfortController::class, 'paymentReturn2'])->name('paymentReturn2');

Route::get('/search-face', [AWSController::class, 'index'])->name('search.index');
Route::post('/search-face', [AWSController::class, 'searchFace'])->name('search.face');
*/