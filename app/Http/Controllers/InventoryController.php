<?php
namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductStock;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $products = Product::latest('created_at')->paginate(10);
        return Inertia::render('Inventory/Index', [
            'products' => $products,
        ]);
    }

    // display available products  (in stock)
    public function stock()
    {
        // $products = ProductStock::latest()->whereDate('created_at', today())->paginate(10);

        // Gets the most recent stock record for each product
        $products = ProductStock::with('products')
            ->whereIn('id', function ($query) {
                $query->selectRaw('MAX(id)')
                    ->from('product_stocks')
                    ->groupBy('product_id');
            })
            ->paginate(10);

        return Inertia::render('Inventory/ProductStock', [
            'products' => $products,
        ]);
    }

    // inventory restock products
    public function addStock()
    {
        return Inertia::render('Inventory/AddStock');
    }

    public function storeStock(Request $request)
    {
        $validated = $request->validate([
            // 'product_id' => 'required|exists:products,id',
            'product_id' => [
                'required',
                'exists:products,id',
                Rule::unique('product_stocks')->where(function ($query) use ($request) {
                    return $query->where('product_id', $request->product_id)
                        ->where('entry_date', $request->entry_date);
                }),
            ],
            'quantity'   => 'required|integer|min:1',
        ]);

        // $alreadyExists = ProductStock::where('product_id', $validated['product_id'])
        //     ->whereDate('created_at', now()->timezone(config('app.timezone'))->toDateString())
        //     ->exists();
        // if ($alreadyExists) {
        //     return back()->withErrors(['product_id' => 'Stock for this product has already been added today.']);
        // }

        ProductStock::create([
            'product_id' => $validated['product_id'],
            'quantity'   => $validated['quantity'],
            'entry_date' => now()->toDateString(),
        ]);

        return back()->with('success', 'Stock added successfully!');
    }

    // Update stcok quantity for a product
    public function updateStock(Request $request, $id)
    {

        $validated = $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);
        $product = ProductStock::findOrFail($id);

        // Calculate total quantity of this product currently in orders
        $totalOrdered = OrderItem::query()
            ->where('product_id', $product->product_id)
            ->sum('quantity');

        // Validate that the new stock level isn't lowerthanwhatisalreadypromisedtoorders;
        if ($validated['quantity'] < $totalOrdered) {
            return back()->withErrors([
                'quantity' => "Cannot set stock to {$validated['quantity']}. There are already {$totalOrdered} items tied to existing orders.",
            ]);
        }

        $product->update([
            'quantity' => $validated['quantity'],
        ]);

        return back()->with('success', 'Stock updated successfully!');
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
