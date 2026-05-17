<?php
namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $filters  = request()->only(['name']);
        $products = Product::latest('created_at')
            ->filter($filters)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Inventory/Index', [
            'products' => ProductResource::collection($products),
        ]);
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
            'stock'       => 'integer|min:0',
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
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'image'       => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:4096'],
            'name'        => ['required', 'string', 'max:255'],
            'size'        => ['required', 'string', 'in:Small,Medium,Large'],
            'price'       => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        return DB::transaction(function () use ($request, $product, $validated) {

            if ($request->hasFile('image')) {
                // Delete old file safely
                if ($product->image && Storage::disk('public')->exists($product->image)) {
                    Storage::disk('public')->delete($product->image);
                }

                // Store new file
                $validated['image'] = $request->file('image')->store('uploads/products', 'public');
            } else {
                // keep existing image if no new file uploaded
                $validated['image'] = $product->image;
            }

            //  Perform the update
            $product->update($validated);

            return redirect()
                ->route('inventory.products')
                ->with('success', "Product {$product->name} updated successfully!");
        });
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

    // Additional method to handle stock updates
    public function updateStock(Request $request, string $id, string $action)
    {
        // validate action
        if (! \in_array($action, ['add', 'reduce'])) {
            return redirect()->route('inventory.products')->with('error', 'Invalid stock action.');
        }

        $product   = Product::findOrFail($id);
        $validated = $request->validate([
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        if ($action === 'add') {
            $newStock = $product->stock + $validated['stock'];

        } else {
            // validate; stock shouldnt be negative
            if ($product->stock < $validated['stock'] || $validated['stock'] <= 0) {
                return redirect()
                    ->route('inventory.products')
                    ->with('error', "Cannot reduce stock by {$validated['stock']} as it exceeds current stock of {$product->stock}.");
            }
            $newStock = $product->stock - $validated['stock'];
        }

        $product->update(['stock' => $newStock]);

        return redirect()
            ->route('inventory.products')
            ->with('success', "Stock for {$product->name} updated successfully!");

        // TODO: log stock change in a separate table for audit trail
    }

}
