<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Subtask extends Model
{
    use HasUuids;
    protected $guarded = ['id'];

    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'completed',
        'task_id'
    ];
}
