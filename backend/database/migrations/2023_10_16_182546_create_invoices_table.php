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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();

            $table->string('fort_id', 20)->nullable()->default(null);

            $table->string('status', 2)->nullable()->default(null);
            $table->string('response_code', 5)->nullable()->default(null);
            $table->string('response_message', 150)->nullable()->default(null);

            $table->string('payment_option', 10)->nullable()->default(null);
            $table->string('card_number', 19)->nullable()->default(null);
            $table->string('card_holder_name')->nullable()->default(null);

            $table->timestamp('generated_at')->nullable()->default(null);

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
        Schema::dropIfExists('invoices');
    }
};
