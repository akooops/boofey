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
        Schema::table('schools', function (Blueprint $table) {
            $table->string('name_ar', 500);
        });

        Schema::table('canteens', function (Blueprint $table) {
            $table->string('name_ar', 500);
            $table->string('address_ar', 3000);
        });

        Schema::table('packages', function (Blueprint $table) {
            $table->string('name_ar', 500)->nullable(false);
            $table->text('description_ar')->nullable(true)->default(null);
        });

        Schema::table('package_features', function (Blueprint $table) {
            $table->string('name_ar', 1000)->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('schools', function (Blueprint $table) {
            $table->dropColumn('name_ar');
        });

        Schema::table('canteens', function (Blueprint $table) {
            $table->dropColumn('name_ar');
            $table->dropColumn('address_ar');
        });

        Schema::table('packages', function (Blueprint $table) {
            $table->dropColumn('name_ar');
            $table->dropColumn('description_ar');
        });

        Schema::table('package_features', function (Blueprint $table) {
            $table->dropColumn('name_ar');
        });
    }
};
