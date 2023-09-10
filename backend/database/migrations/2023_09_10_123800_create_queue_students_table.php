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
        Schema::create('queue_students', function (Blueprint $table) {
            $table->id();

            $table->timestamp('started_at')->nullable(false);
            $table->timestamp('synced_at')->nullable(false);
            $table->timestamp('exited_at')->nullable(true);

            $table->unsignedBigInteger('queue_id')->nullable();
            $table->foreign('queue_id')->nullable()->references('id')->on('queues')->onDelete('cascade');

            $table->unsignedBigInteger('student_id')->nullable();
            $table->foreign('student_id')->nullable()->references('id')->on('students')->onDelete('cascade');
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
        Schema::dropIfExists('queue_students');
    }
};
