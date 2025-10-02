<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Board;
use App\Models\Status;
use Illuminate\Support\Arr;

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
        $board = Board::with('statuses')->find($request["id"]);
        $originalStatuses = $board->statuses->toArray();

        $updatedStatuses = $request["statuses"];
        $cleanStatuses = array_map(
            fn($status)  => Arr::only($status, ['id', 'name', 'color', 'board_id']),
            $updatedStatuses
        );

        $statusesWithoutId = array_filter($cleanStatuses, function ($status) {
            return !isset($status['id']) || empty($status['id']);
        });
        $statusesWithId = array_filter($cleanStatuses, function ($status) {
            return isset($status['id']) && !empty($status['id']);
        });

        $originalIds = array_column($originalStatuses, 'id');
        $updatedIds = array_column($statusesWithId, 'id');
        $deletedIds = array_diff($originalIds, $updatedIds);


        // Bulk Update
        Status::upsert(
            $statusesWithId,
            ['id'],
            ['name', 'color']
        );

        //  Bulk insert
        $board->statuses()->createMany($statusesWithoutId);

        // Bulk Delete
        Status::whereIn('id', $deletedIds)->delete();
    }


    public function destroy($id)
    {
        Board::destroy(($id));
        return redirect('/boards');
    }
}
