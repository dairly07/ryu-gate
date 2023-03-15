<?php

namespace Database\Seeders;

use App\Models\Classroom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassroomSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Classroom::create([
            'name' => 'XII',
            'major' => 'RPL'
        ]);
        Classroom::create([
            'name' => 'XII',
            'major' => 'TKJ'
        ]);
    }
}
