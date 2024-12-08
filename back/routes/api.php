<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

// Routes for the ProductController
Route::get('/products', [ProductController::class, 'index']); // Public route to get products
Route::get('/products/{id}', [ProductController::class, 'show']); // Public route to view a single product
Route::post('/products', [ProductController::class, 'store']);   // Create product
Route::put('/products/{id}', [ProductController::class, 'update']); // Update product
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete product

use App\Http\Controllers\CartController;

// Routes for the CartController
Route::delete('/cart/clear', [CartController::class, 'destroyAll']);

Route::delete('/cart/{id}', [CartController::class, 'destroy']);
Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart', [CartController::class, 'store']);
Route::get('/cart/{id}', [CartController::class, 'show']);
Route::put('/cart/{id}', [CartController::class, 'update']);


