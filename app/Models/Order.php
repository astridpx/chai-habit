<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Types\Builder\User;

class Order extends Model
{
    protected $table    = 'orders';
    protected $fillable = [
        'order_id',
        'customer_id',
        'process_by',
        'status',
        'note',
        'buying_method',
        'is_paid',
        'completed_at',
    ];

    // Create a unique order ID when creating a new order
    protected static function booted()
    {
        static::creating(function ($order) {
            $order->order_id = 'ORD-' . strtoupper(Str::random(8));
        });
    }

    // --- Relationships ---

    // An order can have many order items
    public function orderItems()
    {
        // order_id
        return $this->hasMany(
            OrderItem::class,
            'order_id', // foreign key on order_items table
            'order_id'  // local key on orders table);
        );
    }

    // An order belongs to a customer
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    // An order is processed by a user
    public function processBy()
    {
        return $this->belongsTo(User::class, 'process_by');
    }
}
