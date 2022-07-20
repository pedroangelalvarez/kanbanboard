<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'transDate', 'transTime', 'status', 'priority', 'complexity', 'description', 'tipo', 'solicitante', 'asignado', 'responsable', 'incidenteId'];
}
