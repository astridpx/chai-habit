<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $products = Product::latest()->paginate(10);
        return Inertia::render('Inventory/Index', [
            'products' => $products,
        ]);
    }

    // display available products  (in stock)
    public function stock()
    {
        return Inertia::render('Inventory/ProductStock');
    }

    // inventory restock products
    public function addStock()
    {
        return Inertia::render('Inventory/AddStock');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Inventory/CreateProduct');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image'       => [
                'required',
                'image',
                'mimes:jpg,jpeg,png',
                'max:4096', // 4mb
            ],
            'name'        => 'required|string|max:255',
            'size'        => 'required|string|in:Small,Medium,Large|max:255',
            'price'       => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);
        $path = $request->file('image')->store('uploads/products', 'public');

        // Create product
        Product::create([
             ...$validated,
            'image' => $path,
        ]);

        return back()->with('success', 'New product created successfully!');

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
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('inventory.products')->with('success', 'Product deleted successfully!');
    }
}
