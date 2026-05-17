<?php
namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        Customer::truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create new records
        Customer::factory()->count(30)->create();
    }
}
