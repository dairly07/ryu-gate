<?php

namespace Database\Factories;

use App\Models\Classroom;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nis' => fake()->regexify('^[0-9]{1,8}$'),
            'name' => fake('id')->name(),
            'phone' => fake('id')->randomDigit(),
            'classroom_id' => Classroom::factory()
        ];
    }
}
