<?php
use App\Models\Ticket;
use App\Models\Incidente;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/gettickets', function (Request $request) {
    $tickets = Ticket::paginate(100);
    return $tickets;
});

Route::get('/getticket/{id}', function ($id) {
    $ticket = Ticket::find($id);
    return $ticket;
});

Route::get('/ticket/{id}', function ($id){
    return view('ticket', ['id' => $id]);
});

Route::get('/getincidentes', function (Request $request) {
    $incidentes = Incidente::paginate(100);
    return $incidentes;
});

Route::get('/getincidente/{id}', function ($id) {
    $incidente = Incidente::find($id);
    return $incidente;
});

Route::get('/incidente/{id}', function ($id){
    return view('incidente', ['id' => $id]);
});

Route::get('/getusuarios', function (Request $request) {
    $usuario = Usuario::paginate(100);
    return $usuario;
});

Route::get('/login', function (){
    return view('login');
});