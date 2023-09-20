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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 500)->unique();
            $table->string('name_ar', 500)->unique();

            $table->text('description')->nullable()->default(null);
            $table->text('description_ar')->nullable()->default(null);

            $table->float('sale_price')->nullable()->default(null);
            $table->float('price')->nullable(false)->default(0);

            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('category_id')->nullable()->references('id')->on('categories')->nullOnDelete();

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
        Schema::dropIfExists('products');
    }
};
