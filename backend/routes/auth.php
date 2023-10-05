<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\ModelNotFoundException;

Route::group(['prefix' => 'auth', 'namespace' => 'App\Http\Controllers\Auth', 'middleware' => ['auth:sanctum']], function(){  
    Route::get('authenticated', 'AuthController@authenticated');
    Route::post('logout', 'AuthController@logout');
});

Route::group(['prefix' => 'auth', 'namespace' => 'App\Http\Controllers\Auth', 'middleware' => ['convert.bool.string']], function(){  
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('tokens/refresh', 'AuthController@refreshTokens');
});