<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::latest()->paginate(10);

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customers/CreateCustomer');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'firstname' => 'required|string|max:100',
            'lastname' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:customers,email',
            'phone' => 'required|string|max:20|unique:customers,phone',
            'username' => 'required|string|max:50|unique:customers,username',
            'province' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'brgy' => 'required|string|max:100',
            'street' => 'required|string|max:255',
            'password' => 'required|string|min:8|max:100|confirmed',
        ]);
        // Hash password
        $validated['password'] = Hash::make($validated['password']);

        // Create customer
        Customer::create($validated);

        // return redirect()->route('customers')->with('success', 'New customer created successfully!');
        return back()->with('success', 'New customer created successfully!');
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
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return redirect()->route('customers')->with('success', 'Customer deleted successfully!');
    }
}
