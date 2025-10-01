<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasUuids;
    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'description',
        'status',
        'board_id'
    ];

    public function subtasks()
    {
        return $this->hasMany(Subtask::class);
    }
}
