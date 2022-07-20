<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'nombre', 'apellido', 'email', 'password', 'area', 'rol', 'estado'];
}
