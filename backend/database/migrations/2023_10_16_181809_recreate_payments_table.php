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
        Schema::dropIfExists('payments');

        // Create a new table with the desired columns
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->text('description')->nullable()->default(null);

            $table->string('fort_id', 20)->nullable()->default(null);

            $table->string('status', 2)->nullable()->default(null);
            $table->string('response_code', 5)->nullable()->default(null);
            $table->string('response_message', 150)->nullable()->default(null);

            $table->string('payment_option', 10)->nullable()->default(null);
            $table->string('card_number', 19)->nullable()->default(null);
            $table->string('card_holder_name')->nullable()->default(null);

            $table->float('amount', 8, 3)->nullable(false)->default(0);
            $table->timestamp('paid_at')->nullable()->default(null);

            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('email', 254)->nullable();
            $table->string('phone', 10)->nullable();
            $table->string('address', 1000)->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('zipcode', 5)->nullable();

            $table->unsignedBigInteger('father_id')->nullable();
            $table->foreign('father_id')->nullable()->references('id')->on('fathers')->nullOnDelete();
            
            $table->unsignedBigInteger('subscription_id')->nullable();
            $table->foreign('subscription_id')->nullable()->references('id')->on('subscriptions')->nullOnDelete();
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
        Schema::dropIfExists('payments');
    }
};
