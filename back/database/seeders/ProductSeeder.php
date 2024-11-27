<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define a list of actual products
        $products = [
            [
                'barcode' => '1234567890123',
                'name' => 'Apple iPhone 14',
                'description' => 'Latest iPhone model with advanced features.',
                'price' => 999.99,
                'stock' => 50,
                'category' => 'Electronics',
            ],
            [
                'barcode' => '1234567890124',
                'name' => 'Samsung Galaxy S22',
                'description' => 'Flagship phone from Samsung with AMOLED display.',
                'price' => 899.99,
                'stock' => 40,
                'category' => 'Electronics',
            ],
            [
                'barcode' => '1234567890125',
                'name' => 'Sony WH-1000XM4 Headphones',
                'description' => 'Noise-canceling wireless headphones with high-quality sound.',
                'price' => 348.00,
                'stock' => 30,
                'category' => 'Electronics',
            ],
            [
                'barcode' => '1234567890126',
                'name' => 'Nike Air Max 270',
                'description' => 'Comfortable and stylish sneakers with Air cushioning.',
                'price' => 150.00,
                'stock' => 100,
                'category' => 'Footwear',
            ],
            [
                'barcode' => '1234567890127',
                'name' => 'Dell XPS 13 Laptop',
                'description' => 'High-performance laptop with a slim design and powerful processor.',
                'price' => 1299.99,
                'stock' => 25,
                'category' => 'Computers',
            ],
            [
                'barcode' => '1234567890128',
                'name' => 'Instant Pot Duo 7-in-1 Pressure Cooker',
                'description' => 'Multi-functional kitchen appliance for fast cooking.',
                'price' => 89.99,
                'stock' => 60,
                'category' => 'Home Appliances',
            ],
            [
                'barcode' => '1234567890129',
                'name' => 'Fitbit Charge 5',
                'description' => 'Fitness tracker with health monitoring features.',
                'price' => 129.95,
                'stock' => 80,
                'category' => 'Health & Fitness',
            ],
            [
                'barcode' => '1234567890130',
                'name' => 'Herman Miller Aeron Chair',
                'description' => 'Ergonomic office chair designed for comfort and support.',
                'price' => 1200.00,
                'stock' => 10,
                'category' => 'Furniture',
            ],
            [
                'barcode' => '1234567890131',
                'name' => 'Le Creuset Enameled Cast Iron Dutch Oven',
                'description' => 'Durable and stylish cookware for slow cooking and roasting.',
                'price' => 299.95,
                'stock' => 15,
                'category' => 'Kitchen',
            ],
            [
                'barcode' => '1234567890132',
                'name' => 'Canon EOS R5 Camera',
                'description' => 'Full-frame mirrorless camera with 45MP sensor and 8K video recording.',
                'price' => 3899.00,
                'stock' => 12,
                'category' => 'Cameras',
            ],
        ];

        // Insert the products into the database
        foreach ($products as $product) {
            DB::table('products')->insert([
                'barcode' => $product['barcode'],
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => $product['price'],
                'stock' => $product['stock'],
                'category' => $product['category'],
                'created_at' => now(),  
                'updated_at' => now(),  
            ]);
        }
    }
}