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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');

            $table->integer('class');

            $table->string('nfc_id')->nullable()->default(null);
            $table->string('face_id')->nullable()->default(null);

            $table->boolean('onhold')->default(false);

            $table->unsignedBigInteger('father_id')->nullable();
            $table->foreign('father_id')->nullable()->references('id')->on('fathers')->onDelete('cascade');

            $table->unsignedBigInteger('school_id')->nullable();
            $table->foreign('school_id')->nullable()->references('id')->on('schools')->nullOnDelete();

            $table->unsignedBigInteger('academic_year_id')->nullable();
            $table->foreign('academic_year_id')->nullable()->references('id')->on('academic_years')->nullOnDelete();

            $table->unsignedBigInteger('file_id')->nullable();
            $table->foreign('file_id')->nullable()->references('id')->on('files')->nullOnDelete();
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
        Schema::dropIfExists('students');
    }
};
