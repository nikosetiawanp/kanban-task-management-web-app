<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Board extends Model
{
    use HasFactory;
    use HasUuids;
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $fillable = ['name'];


    public function statuses(): HasMany
    {
        return $this->hasMany(Status::class);
    }
}
