<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{

    protected $table    = 'order_items';
    protected $fillable = [
        'order_id',
        'product_id',
        'total_price',
        'quantity',
        'discount',
    ];

    // ----- Relationships -----

    // An order item belongs to an order
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    // An order item belongs to a product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
