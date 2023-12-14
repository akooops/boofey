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
        Schema::table('used_coupons', function (Blueprint $table) {
            $table->dropForeign(['father_id']);
            $table->dropColumn('father_id');

            $table->unsignedBigInteger('student_id')->nullable();
            $table->foreign('student_id')->nullable()->references('id')->on('students')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('used_coupons', function (Blueprint $table) {
            $table->unsignedBigInteger('father_id')->nullable();
            $table->foreign('father_id')->references('id')->on('fathers')->onDelete('cascade');
            
            $table->dropForeign(['student_id']);
            $table->dropColumn('student_id');
        });
    }
};
