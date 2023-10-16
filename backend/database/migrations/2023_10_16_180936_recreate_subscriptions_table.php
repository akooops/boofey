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
        Schema::dropIfExists('subscriptions');

        // Create a new table with the desired columns
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('ref')->unique()->nullable(false);

            $table->integer('days')->nullable(false)->default(0);
            $table->integer('balance')->nullable(false)->default(0);

            $table->date('started_at')->nullable()->default(null);
            $table->date('expired_at')->nullable()->default(null);

            $table->string('status', 10)->nullable(false)->default('inactive');

            $table->boolean('exclude_from_calculation')->nullable(false)->default(false);

            $table->float('tax')->nullable(false)->default(0);
            $table->float('discount')->nullable(false)->default(0);

            $table->float('subtotal')->nullable(false)->default(0);
            $table->float('total', 8, 3)->nullable(false)->default(0);

            $table->timestamp('initiated_at')->nullable()->default(now());

            $table->unsignedBigInteger('package_id')->nullable();
            $table->foreign('package_id')->nullable()->references('id')->on('packages')->nullOnDelete();
            
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
