<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Customer extends Model implements HasMedia
{
    /**
     * Customer search filter scope
     */
    public function scopeFilter(Builder $query, array $filters): Builder
    {

        $query->when($filters['id'] ?? null, function ($sub, $id) {
            $sub->where('id', $id);
        });

        $query->when($filters['search'] ?? null, function ($q, $search) {
            $q->where(function ($inner) use ($search) {
                $inner->where('firstname', 'like', "%{$search}%")
                    ->orWhere('lastname', 'like', "%{$search}%");
            });
        });

        $query->when($filters['address'] ?? null, function ($q, $address) {
            $q->where(function ($inner) use ($address) {
                $inner->where('province', 'like', "%{$address}%")
                    ->orWhere('city', 'like', "%{$address}%")
                    ->orWhere('brgy', 'like', "%{$address}%")
                    ->orWhere('street', 'like', "%{$address}%");
            });
        });

        $query->when($filters['email'] ?? null, function ($q, $email) {
            $q->where('email', 'like', "%{$email}%");
        });

        return $query;
    }

    /**
     * Image conversions for avatars
     */
    use HasFactory;
    use InteractsWithMedia;
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(400)
            ->height(400)
            ->sharpen(10);
    }

    // table name
    protected $table = 'customers';

    // Fields that are assignable
    protected $fillable = [
        // 'avatar',
        'firstname',
        'lastname',
        'email',
        'username',
        'phone',
        'province',
        'city',
        'brgy',
        'street',
        'is_active',
        'password',
        'last_login',
    ];

    protected $casts = [
        'last_login' => 'datetime',
    ];

    protected $hidden = [
        'password',
    ];

    /**
     * Get the customer's full name.
     */
    protected function fullname(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => "{$attributes['firstname']} {$attributes['lastname']}",
        );
    }
    protected $appends = ['fullname'];

    protected function address(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => "{$attributes['street']}, Brgy. {$attributes['brgy']}, {$attributes['city']}, {$attributes['province']}"
        );
    }

    // ---- Relationships ----
    // A customer can have many orders
    public function customerOrders()
    {
        return $this->hasMany(Order::class, 'customer_id');
    }
}
