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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->float('price')->nullable(false)->default(0);
            $table->integer('qty')->nullable(false)->default(0);

            $table->unsignedBigInteger('product_id')->nullable();
            $table->foreign('product_id')->nullable()->references('id')->on('products')->nullOnDelete();

            $table->unsignedBigInteger('order_id')->nullable();
            $table->foreign('order_id')->nullable()->references('id')->on('orders')->onDelete('cascade');
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
        Schema::dropIfExists('order_items');
    }
};
