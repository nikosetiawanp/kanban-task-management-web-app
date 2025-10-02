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
        $validated =  $request->validate([
            "id" => "required",
            'name' => 'required|string',
            "statuses" => "sometimes|array",
            'statuses.*.name' => 'required|string',
            'statuses.*.color' => 'required|string|size:7',
        ]);

        $board = Board::with('statuses')->find($validated["id"]);
        $originalStatuses = $board->statuses;

        $updatedStatuses = collect($validated["statuses"]);

        $cleanStatuses = $updatedStatuses->map(
            fn($status) => Arr::only($status, ['id', 'name', 'color'])
        );

        $statusesWithoutId = $cleanStatuses->filter(
            fn($status) => blank($status['id'] ?? null)
        );

        $statusesWithId = $cleanStatuses->filter(
            fn($status) => filled($status['id'] ?? null)
        );

        $originalIds = $originalStatuses->pluck('id');
        $updatedIds = $statusesWithId->pluck('id');
        $deletedIds = $originalIds->diff($updatedIds);


        // Update board
        $board->name = $validated["name"];
        $board->save();

        // Bulk update status
        Status::upsert(
            $statusesWithId->toArray(),
            ['id'],
            ['name', 'color']
        );

        // Bulk insert
        $board->statuses()->createMany($statusesWithoutId->toArray());

        // Bulk delete
        Status::whereIn('id', $deletedIds)->delete();
        return redirect('/boards');
    }

    public function destroy($id)
    {
        Board::destroy(($id));
        return redirect('/boards');
    }
}
