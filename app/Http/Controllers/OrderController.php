<?php
namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Http\Resources\ProductResource;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $order = Order::with(['customer', 'orderItems'])->latest('created_at')->paginate(10);
        return Inertia::render('Orders/Index', [
            'orders' => $order,
        ]);
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

        return Inertia::render('Orders/SingleOrder', [
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
        $validated = $request->validate([
            // Order details
            'customer_id'        => 'required|exists:customers,id',
            'note'               => 'required|string',
            'buying_method'      => 'required|in:online,walkin',
            'is_paid'            => 'required|boolean',
            // Order items
            'items'              => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.discount'   => 'nullable|integer|min:0',
        ]);

        return DB::transaction(function () use ($validated) {
            // Create order
            $order = Order::create([
                'customer_id'   => $validated['customer_id'],
                'process_by'    => Auth::id(), // Use the authenticated user's ID
                'note'          => $validated['note'],
                'buying_method' => $validated['buying_method'],
            ]);

            // Create order items
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                if (! $product) {
                    throw new \Exception("Product with ID {$item['product_id']} not found.");
                }

                $totalPrice = ($product->price * $item['quantity']) - ($item['discount'] ?? 0);

                OrderItem::create([
                    'order_id'    => $order->order_id, // Use the generated order_id
                    'product_id'  => $item['product_id'],
                    'quantity'    => $item['quantity'],
                    'discount'    => $item['discount'] ?? 0,
                    'total_price' => $totalPrice,
                ]);
            }

            return redirect()
                ->route('orders.create')
                ->with('success', "Order created successfully!");
        });

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
    public function edit(string $id, Request $request)
    {
        $customerFilter = $request->only(['search']);
        $productFilter  = $request->only(['name']);

        $order = Order::with(['customer', 'orderItems.product'])->findOrFail($id);

        $customers = Customer::latest('created_at')
            ->filter($customerFilter)
            ->paginate(10)
            ->withQueryString();

        $products = Product::latest('created_at')
            ->filter($productFilter)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Orders/SingleOrder', [
            'customers'       => CustomerResource::collection($customers),
            'products'        => ProductResource::collection($products),
            'customerFilters' => $customerFilter,
            'productFilters'  => $productFilter,
            'order'           => $order,
            'id'              => $id,
        ]);
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
