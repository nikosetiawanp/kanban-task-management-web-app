<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Subtask;

class SubtaskController extends Controller
{
    public function index()
    {
        $subtasks = DB::table("subtasks")->get();

        return Inertia::render("Subtasks/Index", props: [
            "subtasks" => $subtasks,
        ]);
    }

    public function show($id)
    {
        $subtasks = DB::table("subtasks")
            ->where("id", $id)->first();

        return Inertia::render("Tasks/Show", props: [
            "subtasks" => $subtasks,
        ]);
    }

    public function store(Request $request) {}


    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|uuid',
            'name' => 'required|string',
            'completed' => 'required|boolean'
        ]);

        $subtask = Subtask::find($validated['id']);

        $subtask->update([
            'id' => $validated['id'],
            'name' => $validated['name'],
            'completed' => $validated['completed'],
        ]);
    }

    public function destroy($id) {}
}
