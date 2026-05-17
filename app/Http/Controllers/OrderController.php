<?php
namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Http\Resources\ProductResource;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Orders/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $customerFilter = $request->only(['search']);
        $productFilter  = $request->only(['name']);

        $customers = Customer::latest('created_at')
            ->filter($customerFilter)
            ->paginate(10)
            ->withQueryString();

        $products = Product::latest('created_at')
            ->filter($productFilter)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Orders/CreateOrder', [
            'customers'       => CustomerResource::collection($customers),
            'products'        => ProductResource::collection($products),
            'customerFilters' => $customerFilter,
            'productFilters'  => $productFilter,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
