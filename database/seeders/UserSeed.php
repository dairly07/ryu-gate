<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'code' => 'RYU14',
            'password' => bcrypt('potato'),
            'name' => 'Ryan Suranjana',
            'role' => 'admin'
        ]);
        User::create([
            'code' => 'HR19',
            'password' => bcrypt('potato'),
            'name' => 'Hartha Sedana',
            'role' => 'petugas'
        ]);
    }
}
