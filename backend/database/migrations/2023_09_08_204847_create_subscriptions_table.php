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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();

            $table->integer('days')->nullable(false)->default(0);
            $table->integer('balance')->nullable(false)->default(0);

            $table->date('should_start_at')->nullable()->default(null);
            $table->date('started_at')->nullable()->default(null);

            $table->unsignedBigInteger('payment_id')->nullable();
            $table->foreign('payment_id')->nullable()->references('id')->on('payments')->nullOnDelete();
            
            $table->unsignedBigInteger('student_id')->nullable();
            $table->foreign('student_id')->nullable()->references('id')->on('students')->nullOnDelete();
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
        Schema::dropIfExists('subscriptions');
    }
};
