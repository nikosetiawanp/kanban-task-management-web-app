<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasUuids;
    protected $guarded = ['id'];

    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'description',
        'status_id'
    ];

    public function subtasks(): HasMany
    {
        return $this->hasMany(Subtask::class);
    }
}
