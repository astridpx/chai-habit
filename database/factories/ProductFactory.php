<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productNames = [
            'Green Tea',
            'Orange Juice',
            'Fresh Lemonade',
            'Iced Matcha Latte',
            'Classic Espresso',
            'Cold Brew Coffee',
            'Earl Grey Tea',
            'Mango Smoothie',
            'Strawberry Milkshake',
            'Apple Cider',
            'Chai Latte',
            'Hibiscus Iced Tea',
            'Caramel Macchiato',
            'Flat White',
            'Hot Chocolate',
            'Peach Italian Soda',
            'Watermelon Slush',
            'Jasmine Pearl Tea',
            'Pineapple Ginger Juice',
            'Vietnamese Iced Coffee',
        ];
        return [
            'image'       => 'uploads/products/YnFy0k9hCIyoQ6wDsiuq5UkOqapHxbc5xSlz3QNW.png',
            // 'name'  => ucwords($this->faker->words(3, true)),
            'name'        => $this->faker->randomElement($productNames),
            'size'        => $this->faker->randomElement(['Small', 'Medium', 'Large']),
            'description' => $this->faker->sentence(),
            'price'       => $this->faker->numberBetween(50, 500), // Price in cents
            'stock'       => $this->faker->numberBetween(0, 100),
        ];
    }
}
