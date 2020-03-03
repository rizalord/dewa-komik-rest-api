<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMangasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('manga', function (Blueprint $table) {
            $table->bigIncrements('id_manga');
            $table->string('name' , 100);
            $table->string('image' , 255);
            $table->string('genres', 150);
            $table->boolean('status');
            $table->boolean('featured');
            $table->string('author', 30);
            $table->text('summary');
            $table->tinyInteger('views');
            $table->tinyInteger('bookmarked');
            $table->tinyInteger('likes');
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
        Schema::dropIfExists('manga');
    }
}
