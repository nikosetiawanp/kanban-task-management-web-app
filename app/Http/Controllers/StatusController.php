<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Board;
use App\Models\Status;
use Illuminate\Support\Facades\Gate;

class StatusController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'color' => 'required|string|size:7',
            'boardId' => 'required|uuid'
        ]);

        $board = Board::findOrFail($validated['boardId']);
        Gate::authorize('update-board', $board);

        $board->statuses()->create([
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

        $status = Status::find($validated['id']);
        Gate::authorize('update-status', $status);

        $status->update([
            'name' => $validated['name'],
            'color' => $validated['color']
        ]);
    }
}
