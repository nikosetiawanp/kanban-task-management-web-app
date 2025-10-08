<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Model
{
    use HasFactory;
    use HasUuids;
    protected $guarded = ['id'];

    protected $fillable = [
        'name',
        'color',
        'board_id'
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
