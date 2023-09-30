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
        Schema::table('payments', function (Blueprint $table) {
            $table->string('fort_id')->nullable()->default(null);
            $table->unsignedBigInteger('payment_method_id')->nullable();
            $table->foreign('payment_method_id')->nullable()->references('id')->on('payment_methods')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['payment_method_id']);
            $table->dropColumn('payment_method_id');
            $table->dropColumn('fort_id');
        });
    }
};
