<?php

use App\Http\Controllers\Auth\DestroyAccountController;
use App\Http\Controllers\Auth\SecurityController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('home/index');
})->name('home');

Route::get('home-controller', [HomeController::class, 'index'])->name('home-controller');

Route::middleware('auth')->group(function () {
    Route::controller(ProfileController::class)->group(function () {
        Route::get('profile', 'index')->name('profile.index');
        Route::patch('profile', 'update')->name('profile.update');
    });

    Route::controller(SecurityController::class)->group(function () {
        Route::get('security', 'index')->name('security.index');
        Route::patch('security', 'update')->name('security.update');
    });

    Route::controller(DestroyAccountController::class)->group(function () {
        Route::get('danger', 'index')->name('danger.index');
        Route::delete('danger', 'destroy')->name('danger.destroy');
    });

    Route::prefix('/admin-panel/')->middleware(['role:admin'])->group(function () {
        Route::resource('products', ProductController::class);

        Route::patch('products/{product}/update_status/{new_status}', [
            ProductController::class,
            'update_status'
        ])->name('products.update-status');

        Route::get('dashboard', DashboardController::class)->middleware(['verified'])->name('dashboard');

        Route::resource('users', UserController::class);
        Route::resource('orders', OrderController::class);
    });
});

require __DIR__ . '/auth.php';
