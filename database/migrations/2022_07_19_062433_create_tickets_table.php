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
        Schema::create('tickets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('transDate');
            $table->time('transTime');
            $table->string('status');
            $table->string('priority');
            $table->string('complexity');
            $table->string('description');
            $table->string('tipo');
            $table->string('solicitante');
            $table->string('asignado');
            $table->string('responsable');
            $table->integer('incidenteId');
            //$table->timestamps();


            //id int, transDate date, transTime time, status varchar(15), priority int, complexity int, description varchar(30), tipo varchar(12), solicitante varchar(10), asignado varchar(10), responsable varchar(10)
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickets');
    }
};
