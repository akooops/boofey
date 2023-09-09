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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->float('tax')->nullable(false)->default(0);
            $table->float('discount')->nullable(false)->default(0);

            $table->float('subtotal')->nullable(false)->default(0);
            $table->float('total', 8, 3)->nullable(false)->default(0);

            $table->unsignedBigInteger('father_id')->nullable();
            $table->foreign('father_id')->nullable()->references('id')->on('fathers')->nullOnDelete();

            $table->unsignedBigInteger('package_id')->nullable();
            $table->foreign('package_id')->nullable()->references('id')->on('packages')->nullOnDelete();
            
            $table->unsignedBigInteger('coupon_id')->nullable();
            $table->foreign('coupon_id')->nullable()->references('id')->on('coupons')->nullOnDelete();
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
