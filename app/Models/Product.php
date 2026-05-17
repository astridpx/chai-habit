<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    use HasFactory;

    /**
     * Prodducts search filter scope
     */
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        $query->when($filters['id'] ?? null, function ($sub, $id) {
            $sub->where('id', $id);
        });

        $query->when($filters['name'] ?? null, function ($q, $name) {
            $q->where('name', 'like', "%{$name}%");
        });

        return $query;
    }
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
