<?php

namespace Database\Factories;

use App\Enum\Gender;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nama_lengkap' => $name = fake()->name(),
            'username' => $username = strtolower(firstWord($name)) . mt_rand(11111, 99999),
            'no_telp' => fake()->phoneNumber(),
            'jenis_kelamin' => fake()->randomElement(array_column(Gender::cases(), 'value')),
            'alamat' => fake()->address(),
            'tanggal_lahir' => fake()->date(),
            'email' => $username . '@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // password
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
