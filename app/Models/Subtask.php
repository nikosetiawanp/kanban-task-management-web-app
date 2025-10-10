<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Task;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subtask extends Model
{
    use HasFactory;
    use HasUuids;
    protected $guarded = ['id'];

    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'completed',
        'task_id'
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
