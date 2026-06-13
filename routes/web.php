<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

// authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // ***** Orders ******
    Route::prefix('orders')->group(function () {
        //  VIEW
        Route::get('/all', [OrderController::class, 'index'])->name('orders');
        Route::get('/recent', [OrderController::class, 'recent'])->name('orders.recent');
        Route::get('/create', [OrderController::class, 'create'])->name('orders.create');
        Route::get('/{id}', [OrderController::class, 'edit'])->name('orders.edit');

        // APIs
        Route::post('/', [OrderController::class, 'store'])->name('orders.store');
        Route::post('/{id}', [OrderController::class, 'update'])->name('orders.update');
    });

    // ***** Customers ******
    Route::prefix('customers')->group(function () {
        //  VIEW
        Route::get('/list', [CustomerController::class, 'index'])->name('customers');
        Route::get('/new', [CustomerController::class, 'create'])->name('customers.new');

        // APIs
        Route::post('/', [CustomerController::class, 'store'])->name('customers.store');
        Route::delete('/{id}', [CustomerController::class, 'destroy'])->name('customers.destroy');
    });

    // ***** Inventory ******
    Route::prefix('inventory')->group(function () {
        // View
        Route::get('/products', [InventoryController::class, 'index'])->name('inventory.products');
        Route::get('/products/add', [InventoryController::class, 'create'])->name('inventory.products.add');
        Route::get('/products/stock', [InventoryController::class, 'stock'])->name('inventory.product.stock');
        // Route::get('/products/stock/add', [InventoryController::class, 'addStock'])->name('inventory.products.stock.add');

        //  APIs
        Route::post('/products/add', [InventoryController::class, 'store'])->name('inventory.products.store');
        Route::delete('/products/{id}', [InventoryController::class, 'destroy'])->name('inventory.products.destroy');
        Route::post('/products/{id}', [InventoryController::class, 'update'])->name('inventory.products.update');

        // update a product stock
        Route::post('/products/stock/{id}/{action}', [InventoryController::class, 'updateStock'])->name('inventory.products.updateStock');
    });

    // ***** REPORTS *****
    Route::get('/reports/inventory-analysis', [ReportController::class, 'inventoryAnalysis'])->name('reports.inventory-analysis');
    // Route::get('/reports/transactions', [InventoryController::class, 'transactions'])->name('reports.transactions');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
