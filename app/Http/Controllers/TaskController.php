<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Task;
use App\Models\Subtask;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;



class TaskController extends Controller
{
    public function index() {}

    public function show($id) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description'  => 'required|string',
            'statusId' => 'required|uuid',
            'subtasks' => 'sometimes|array',
            'subtasks.*.name' => 'required|string',
            'subtasks.*.completed' => 'sometimes|boolean'
        ]);

        DB::transaction(function () use ($validated) {
            $status = Status::with('board')->find($validated['statusId']);

            Gate::authorize('update-status', $status);

            // Create task
            $task = Task::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'status_id' => $validated['statusId'],
            ]);

            // Create subtasks
            $task->subtasks()->createMany($validated["subtasks"] ?? []);

            return $task;
        });
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|uuid',
            'title' => 'required|string',
            'description' => 'required|string',
            'statusId' => 'required|uuid',
            'subtasks' => 'sometimes|array',
            'subtasks.*.name' => 'required|string',
            'subtasks.*.completed' => 'sometimes|boolean'
        ]);

        DB::transaction(function () use ($validated) {
            $task = Task::with('status.board')->find($validated['id']);

            Gate::authorize('update-task', $task);

            // Update task
            $task->update([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'status_id' => $validated['statusId'],
            ]);

            $originalIds = $task->subtasks()->pluck('id')->toArray();
            $requestIds = array_column((array_filter($validated["subtasks"], fn($subtask) => !empty($subtask["id"]))), 'id');
            $deletedIds = array_diff($originalIds, $requestIds);

            // Delete subtasks
            Subtask::whereIn('id', $deletedIds)->delete();

            // Update subtasks
            $update = (array_filter($validated["subtasks"], fn($subtask) => !empty($subtask['id'])));
            Subtask::upsert($update, ['id'], ['name', 'completed']);

            // Create subtasks
            $new = (array_filter($validated["subtasks"], fn($status) => empty($status["id"])));
            $task->subtasks()->createMany($new);

            return $task;
        });
    }


    public function destroy($id)
    {
        $task = Task::with('status.board')->find($id);

        Gate::authorize('delete-task', $task);
        $task->destroy($task['id']);
    }
}
