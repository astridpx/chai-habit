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
    ];

    // ----- Relationships -----

    // A product has many stock records
    public function stock()
    {
        return $this->hasMany(ProductStock::class, 'product_id');
    }

    // A product can be in many order items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_id');
    }
}
