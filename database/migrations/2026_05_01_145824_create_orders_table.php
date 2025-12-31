<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * List of orders
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->uuid('order_id')->unique();
            $table->foreignId('customer_id')->constrained();
            $table->foreignId('process_by')->references('id')->on('users');
            $table->enum('status', ['pending', 'processing', 'completed', 'cancelled'])->default('pending');
            $table->string('note')->nullable();
            $table->enum('buying_method', ['online', 'walkin'])->nullable(false);
            $table->boolean('is_paid')->default(false);
            $table->dateTime('completed_at')->nullable();
            $table->timestamps();
            // $table->dateTime('completed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
