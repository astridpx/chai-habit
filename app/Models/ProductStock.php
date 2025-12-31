<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductStock extends Model
{
    protected $table = 'product_stocks';

    protected $fillable = ['product_id', 'quantity', 'entry_date'];

    // ----- Relationships -----

    // A stock record belongs to a product
    public function products()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

}
