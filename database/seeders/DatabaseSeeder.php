<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Board;
use App\Models\Status;
use App\Models\Subtask;
use App\Models\Task;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        Board::factory()
            ->count(5)
            ->has(
                Status::factory()
                    ->count(3)
                    ->has(
                        Task::factory()
                            ->count(3)
                            ->has(
                                Subtask::factory()
                                    ->count(3),
                                'subtasks'
                            ),
                        'tasks'
                    ),
                'statuses'
            )
            ->create();
    }
}
