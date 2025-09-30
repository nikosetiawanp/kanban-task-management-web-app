<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


use Str;

class BoardController extends Controller
{
    public function index()
    {
        $boards = DB::table("boards")->get();

        return Inertia::render("Boards/Index", [
            "boards" => $boards
        ]);
    }

    public function show($id)
    {
        $board = DB::table("boards")->where('id', $id)->first();
        return Inertia::render('Boards/Show', [
            'board' => $board
        ]);
    }

    public function store(Request $request)
    {
        DB::table('boards')->insert([
            'id' => Str::uuid(),
            'name' => $request->name,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

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
        DB::table('boards')
            ->where('id', $id)
            ->delete();
        return redirect('/boards');
    }
}
