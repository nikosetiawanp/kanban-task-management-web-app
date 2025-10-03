<?php

namespace App\Http\Controllers;

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
            'description'  => 'nullable|string',
            'statusId' => 'required|uuid',
            'subtasks' => 'sometimes|array',
            'subtasks.*.name' => 'required_with:subtasks|string',
            'subtasks.*.completed' => 'sometimes|boolean'
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status_id' => $validated['statusId'],
        ]);


        $task->subtasks()->createMany($validated['subtasks']);

        return redirect('/tasks');
    }

    public function update(Request $request) {}

    public function destroy($id) {}
}
