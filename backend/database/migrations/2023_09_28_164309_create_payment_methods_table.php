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
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            
            $table->string('ref')->unique()->nullable()->default(null);
            $table->string('card_number', 19);
            $table->string('card_holder_name', 500);
            $table->string('card_bin', 19);
            $table->integer('expiry_date');
            $table->string('token_name', 500);

            $table->unsignedBigInteger('father_id')->nullable();
            $table->foreign('father_id')->nullable()->references('id')->on('fathers')->onDelete('cascade');
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
        Schema::dropIfExists('payment_methods');
    }
};
