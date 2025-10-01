<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Str;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = DB::table("tasks")->get();

        return Inertia::render("Tasks/Index", [
            "tasks" => $tasks
        ]);
    }

    public function show($id)
    {
        $task = DB::table("tasks")
            ->where('id', $id)->first();

        return Inertia::render('Tasks/Show', [
            'task' => $task
        ]);
    }

    public function store(Request $request)
    {
        DB::table('tasks')
            ->insert([
                'id' => Str::uuid(),
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status,
                'created_at' => now(),
                'updated_at' => now(),
                'board_id' => $request->board_id,
            ]);

        return redirect('/tasks');
    }

    public function update(Request $request)
    {
        DB::table('tasks')
            ->where('id', $request->id)
            ->update([
                'id' => $request->id,
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status,
                'updated_at' => now(),
                'board_id' => $request->board_id,
            ]);

        return redirect('/tasks');
    }

    public function destroy($id)
    {
        DB::table('tasks')
            ->where('id', $id)
            ->delete();
        return redirect('/tasks');
    }
}
