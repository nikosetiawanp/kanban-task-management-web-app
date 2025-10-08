<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;
use App\Models\Status;

class StatusController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'color' => 'required|string|size:7',
            'boardId' => 'required|uuid'
        ]);

        Board::find($validated["boardId"])->statuses()->create([
            'name' => $validated['name'],
            'color' => $validated['color'],
            'board_id' => $validated['boardId']
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required',
            'name' => 'required',
            'color' => 'required|string|size:7',
        ]);

        Status::find($validated['id'])->update([
            'name' => $validated['name'],
            'color' => $validated['color']
        ]);

        // dd($request->all());
    }

    // public function storeMany(Request $request, $boardId)
    // {
    //     $validated = $request->validate([
    //         'statuses' => 'required|array',
    //         'statuses.*.name' => 'required|string|max:255',
    //         'statuses.*.color' => 'required|string|max:50'
    //     ]);

    //     $board = Board::findOrFail($boardId);

    //     $board->statuses()->createMany($validated['statuses']);

    //     return Inertia::render('Boards/Show', [
    //         'board' => $board->load('statuses.tasks.subtasks')
    //     ]);
    // }
}
