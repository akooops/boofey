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
            $table->string('ref')->unique()->nullable()->default(null);
            $table->boolean('pending')->nullable(false)->default(0);
            $table->unsignedBigInteger('student_id')->nullable();
            $table->foreign('student_id')->nullable()->references('id')->on('students')->nullOnDelete();
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
            $table->dropForeign(['student_id']);
            $table->dropColumn('pending');
            $table->dropColumn('student_id');
            $table->dropColumn('ref');
        });
    }
};
