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

            $table->string('ref')->unique()->nullable(false);

            $table->float('tax')->nullable(false)->default(0);
            $table->float('discount')->nullable(false)->default(0);

            $table->float('subtotal')->nullable(false)->default(0);
            $table->float('total', 8, 3)->nullable(false)->default(0);
            
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
