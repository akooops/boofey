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
        Schema::create('academic_breaks', function (Blueprint $table) {
            $table->id();
            $table->string('name', 500)->nullable(false);
            $table->date('from');
            $table->date('to');
            $table->unsignedBigInteger('academic_year_id')->nullable();
            $table->foreign('academic_year_id')->nullable()->references('id')->on('academic_years')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academic_breaks');
    }
};
