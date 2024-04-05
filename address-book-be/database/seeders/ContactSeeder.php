<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seeder per i contatti
        $contacts = [
            [
                'type_id' => 3,
                'name' => 'Alice Johnson',
                'email' => 'alice@example.com',
                'phone_number' => '2345678901'
            ],
            [
                'type_id' => 1,
                'name' => 'Bob Williams',
                'email' => 'bob@example.com',
                'phone_number' => '3456789012'
            ],
            [
                'type_id' => 4,
                'name' => 'Charlie Brown',
                'email' => 'charlie@example.com',
                'phone_number' => '4567890123'
            ],
            [
                'type_id' => 2,
                'name' => 'David Lee',
                'email' => 'david@example.com',
                'phone_number' => '5678901234'
            ],
            [
                'type_id' => 3,
                'name' => 'Ella Taylor',
                'email' => 'ella@example.com',
                'phone_number' => '6789012345'
            ],
            [
                'type_id' => 1,
                'name' => 'Frank White',
                'email' => 'frank@example.com',
                'phone_number' => '7890123456'
            ],
            [
                'type_id' => 4,
                'name' => 'Grace Martinez',
                'email' => 'grace@example.com',
                'phone_number' => '8901234567'
            ],
            [
                'type_id' => 2,
                'name' => 'Henry Garcia',
                'email' => 'henry@example.com',
                'phone_number' => '9012345678'
            ]
        ];

        foreach ($contacts as $contact) {
            Contact::create($contact);
        }
    }
}
