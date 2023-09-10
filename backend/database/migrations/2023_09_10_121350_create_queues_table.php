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
        Schema::create('queues', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('type')->nullable(false)->default(0);

            $table->timestamp('started_at')->nullable(false);
            $table->timestamp('closed_at')->nullable(true);

            $table->unsignedBigInteger('canteen_id')->nullable();
            $table->foreign('canteen_id')->nullable()->references('id')->on('canteens')->onDelete('cascade');
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
        Schema::dropIfExists('queues');
    }
};
