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
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('name', 500)->nullable(false);
            $table->text('description');

            $table->float('sale_price')->nullable()->default(null);
            $table->float('price')->nullable(false)->default(0);

            $table->integer('days')->nullable(false)->default(0);

            $table->boolean('yearly')->default(0);
            $table->boolean('popular')->default(0);

            $table->unsignedBigInteger('school_id')->nullable();
            $table->foreign('school_id')->nullable()->references('id')->on('schools')->onDelete('cascade');
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
        Schema::dropIfExists('packages');
    }
};
