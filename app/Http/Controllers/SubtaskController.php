<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Str;
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

    public function store(Request $request)
    {
        DB::table('subtasks')
            ->insert([
                'id' => Str::uuid(),
                'name' => $request->name,
                'completed' => $request->completed,
                'created_at' => now(),
                'updated_at' => now(),
                'task_id' => $request->task_id
            ]);

        return redirect('/subtasks');

    }


    public function update(Request $request)
    {
        DB::table('subtasks')
            ->where('id', $request->id)
            ->update([
                'id' => $request->id,
                'name' => $request->name,
                'updated_at' => now(),
                'task_id' => $request->task_id
            ]);

        return redirect('/subtasks');

    }

    public function destroy($id)
    {
        DB::table('subtasks')
            ->where('id', $id)
            ->delete();

        return redirect('/subtasks');
    }
}
