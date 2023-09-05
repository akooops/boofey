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

            $table->unsignedBigInteger('parent_id')->nullable();
            $table->foreign('parent_id')->nullable()->references('id')->on('parents')->onDelete('cascade');

            $table->unsignedBigInteger('school_id')->nullable();
            $table->foreign('school_id')->nullable()->references('id')->on('schools')->nullOnDelete();

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
