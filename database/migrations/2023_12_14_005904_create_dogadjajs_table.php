<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dogadjajs', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->dateTime('datum_pocetka');
            $table->dateTime('datum_kraja');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dogadjajs');
    }
};