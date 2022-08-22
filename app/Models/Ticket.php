<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    public $timestamps = false;
    use HasFactory;

    protected $fillable = ['id', 'transDate', 'transTime', 'closeDate', 'closeTime', 'status', 'priority', 'complexity', 'description', 'tipo', 'solicitante', 'asignado', 'responsable', 'incidenteId'];
}
