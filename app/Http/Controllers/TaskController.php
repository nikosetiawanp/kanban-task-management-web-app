<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Task;
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

        // Create task
        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status_id' => $validated['statusId'],
        ]);

        // Create subtasks
        $task->subtasks()->createMany($validated["subtasks"]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|uuid',
            'title' => 'required|string',
            'description' => 'required|string',
            'statusId' => 'required|uuid',
        ]);

        Task::find($validated["id"])->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status_id' => $validated['statusId'],
        ]);
    }

    public function destroy($id)
    {
        Task::destroy(($id));
        return redirect('/boards');
    }
}
