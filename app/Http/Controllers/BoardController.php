<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Board;



class BoardController extends Controller
{
    public function index()
    {
        $boards = Board::all(['id', 'title']);

        return Inertia::share([
            'boards' => fn() => $boards,
        ]);

        // return Inertia::render(component: 'Boards/Index', ['boards' => $boards]);
    }

    public function show($id)
    {
        $board = $id
            ? Board::with('statuses.tasks.subtasks')->find($id)
            : Board::with('statuses.tasks.subtasks')->first();

        return Inertia::render('Boards/Show', [
            'board' => $board ?? [],
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'statuses' => 'sometimes|array',
            'statuses.*.name' => 'required|string',
            'statuses.*.color' => 'required|string|size:7',
        ]);

        $board = Board::create(['name' => $validatedData['name']]);
        $board->statuses()->createMany($validatedData['statuses']);

        return redirect('/boards');
    }

    public function update(Request $request)
    {
        DB::table('boards')
            ->where('id', $request->id)
            ->update([
                'name' => $request->name,
                'updated_at' => now()
            ]);
        return redirect('/boards');
    }

    public function destroy($id)
    {
        Board::destroy(($id));
        return redirect('/boards');
    }
}
