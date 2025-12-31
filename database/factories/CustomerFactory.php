<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'firstname' => $this->faker->firstName(),
            'lastname' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'username' => $this->faker->unique()->userName(),
            'phone' => $this->faker->phoneNumber(),
            'province' => $this->faker->state(),
            'city' => $this->faker->city(),
            'brgy' => $this->faker->streetName(),
            'street' => $this->faker->streetAddress(),
            'is_active' => $this->faker->boolean(90),
            'password' => bcrypt('password'), // Default password
            'last_login' => $this->faker->dateTimeBetween('-1 years', 'now'),
        ];
    }
}
