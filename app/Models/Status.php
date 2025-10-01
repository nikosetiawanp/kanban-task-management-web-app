<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasUuids;
    protected $fillable = [
        'name',
        'color',
        'board_id'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
