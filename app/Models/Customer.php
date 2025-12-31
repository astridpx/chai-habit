<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Customer extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    // Image conversions for avatars
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
}
