<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incidentes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('transDate');
            $table->time('transTime');
            $table->date('closeDate')->nullable();
            $table->time('closeTime')->nullable();
            $table->string('status');
            $table->string('priority');
            $table->string('complexity');
            $table->string('description');
            $table->string('tipo');
            $table->string('solicitante');
            $table->string('asignado');
            $table->string('responsable');
            $table->text('causa')->nullable();
            $table->text('solucion')->nullable();
            //$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('incidentes');
    }
};
