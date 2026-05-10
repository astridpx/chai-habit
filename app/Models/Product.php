<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'image',
        'name',
        'size',
        'description',
        'price',
        'stock',
    ];

    // ----- Relationships -----

    // A product can be in many order items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_id');
    }
}
