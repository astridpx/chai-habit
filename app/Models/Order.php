<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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

    // --- Relationships ---

    // An order can have many order items
    public function orderItems()
    {
        // order_id
        return $this->hasMany(OrderItem::class, 'order_id');
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
