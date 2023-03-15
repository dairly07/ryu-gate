<?php

namespace App\Models;

use App\Traits\HasUuidPrimaryKey;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LateStudent extends Model
{
    use HasFactory, HasUuidPrimaryKey, SoftDeletes;

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
}
