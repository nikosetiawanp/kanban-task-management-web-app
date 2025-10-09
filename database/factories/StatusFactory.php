<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Status>
 */
class StatusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $colors = collect([
            '#9CA3AF',
            '#49C4E5',
            '#67E2AE',
            '#8471F2',
            '#FF8C82',
            '#FFD866',
            '#F5A97F',
            '#F472B6',
        ]);

        return [
            'name' => rtrim($this->faker->realTextBetween(4, 10), '.'),
            'color' => $colors->random(),
        ];
    }
}
