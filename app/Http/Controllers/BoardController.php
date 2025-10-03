<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Board;
use App\Models\Status;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;


class BoardController extends Controller
{
    public function index() {}

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

        $board = Board::find($validated["id"]);

        // Update board name
        $board->update([
            "name" => $request["name"],
        ]);

        // Delete status
        $originalIds = $board->statuses()->pluck('id')->toArray();
        $requestIds = array_column((array_filter($validated["statuses"], fn($status) => !empty($status["id"]))), 'id');
        $deletedIds = array_diff($originalIds, $requestIds);
        Status::whereIn('id', $deletedIds)->delete();

        // Update statuses
        $update = (array_filter($validated["statuses"], fn($status) => !empty($status["id"])));
        Status::upsert($update, ['id'], ['name', 'color']);

        // Create status
        $new = (array_filter($validated["statuses"], fn($status) => empty($status["id"])));
        $board->statuses()->createMany($new);

        return redirect('/boards');
    }

    public function destroy($id)
    {
        Board::destroy(($id));
        return redirect('/boards');
    }
}
