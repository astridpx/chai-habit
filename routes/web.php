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

    // orders
    Route::get('/orders/all', [OrderController::class, 'index'])->name('orders');
    // Route::get('/customers/new', [CustomerController::class, 'create'])->name('customers.new');

    // customers - VIEW ONLY
    Route::get('/customers/list', [CustomerController::class, 'index'])->name('customers');
    Route::get('/customers/new', [CustomerController::class, 'create'])->name('customers.new');

    // Customer - APIs
    Route::post('/customers', [CustomerController::class, 'store'])->name('customers.store');
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->name('customers.destroy');

    // inventory
    Route::get('/inventory/products', [InventoryController::class, 'index'])->name('inventory.products');
    Route::get('/inventory/products/add', [InventoryController::class, 'create'])->name('inventory.products.add');
    Route::get('/inventory/products/stock', [InventoryController::class, 'stock'])->name('inventory.product.stock');
    Route::get('/inventory/products/stock/add', [InventoryController::class, 'addStock'])->name('inventory.products.stock.add');

    // Inventory - APIs
    Route::post('/inventory/products/add', [InventoryController::class, 'store'])->name('inventory.products.store');
    Route::delete('/inventory/products/{id}', [InventoryController::class, 'destroy'])->name('inventory.products.destroy');

    // reports
    Route::get('/reports/inventory-analysis', [ReportController::class, 'inventoryAnalysis'])->name('reports.inventory-analysis');
    // Route::get('/reports/transactions', [InventoryController::class, 'transactions'])->name('reports.transactions');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
