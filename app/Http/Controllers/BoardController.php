<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Board;
use App\Models\Status;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class BoardController extends Controller
{
    public function index()
    {
        $emptyBoard = [
            'id' => '',
            'name' => '',
            'statuses' => [],
        ];

        return Inertia::render('Boards/Index', [
            'board' => $emptyBoard
        ]);
    }

    public function show($id)
    {
        $board = Board::with('statuses.tasks.subtasks')->find($id);
        if (!$board) return redirect('/boards');

        Gate::authorize('get-board', $board);

        return Inertia::render('Boards/Show', [
            'board' => $board
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

        $board = DB::transaction(function () use ($validatedData) {
            $board = Board::create([
                'name' => $validatedData['name'],
                'user_id' => Auth::id(),
            ]);
            $board->statuses()->createMany($validatedData['statuses'] ?? []);
            return $board;
        });

        return redirect('/boards/' . $board->id);
    }

    public function update(Request $request)
    {
        // Validate
        $validated = $request->validate([
            'id'  => 'required|uuid',
            'name' => 'required|string',
            'statuses' => 'sometimes|array',
            'statuses.*.id' => 'nullable|uuid',
            'statuses.*.name' => 'required|string',
            'statuses.*.color' => 'required|string|size:7',
            'statuses.*.board_id' => 'sometimes|nullable|uuid'
        ]);

        $board = DB::transaction(function () use ($validated) {

            $board = Board::find($validated["id"]);

            // Update board name
            $board->update([
                "name" => $validated["name"],
            ]);

            $originalIds = $board->statuses()->pluck('id')->toArray();
            $requestIds = array_column((array_filter($validated["statuses"], fn($status) => !empty($status["id"]))), 'id');
            $deletedIds = array_diff($originalIds, $requestIds);

            // Delete statuses
            Status::whereIn('id', $deletedIds)->delete();

            // Update statuses
            $update = (array_filter($validated["statuses"], fn($status) => !empty($status["id"])));
            Status::upsert($update, ['id'], ['name', 'color']);

            // Create status
            $new = (array_filter($validated["statuses"], fn($status) => empty($status["id"])));
            $board->statuses()->createMany($new);

            return $board;
        });

        return redirect('/boards/' . $board->id);
    }

    public function destroy($id)
    {
        $board = Board::findOrFail($id);

        Gate::authorize('delete-board', $board);

        $board->destroy($board['id']);
        return redirect('/boards');
    }
}
