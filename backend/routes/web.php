<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PayfortController;

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

Route::get('payfort', [PayfortController::class, 'index'])->name('payfort');
Route::get('calculateSignature', [PayfortController::class, 'calculateSignature'])->name('calculateSignature');
Route::post('paymentReturn', [PayfortController::class, 'paymentReturn'])->name('paymentReturn');
