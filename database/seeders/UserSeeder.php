<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info("Creating ADMIN user");
        \App\Models\User::factory()->create([
            'nama_lengkap' => 'admin',
            'email' => 'admin@app.com',
        ])->addRole('admin');

        $this->command->info("Creating CUSTOMER user");
        \App\Models\User::factory()->create([
            'nama_lengkap' => 'customer',
            'email' => 'customer@app.com',
        ])->addRole('customer');
    }
}
