<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    //
    protected $table = 'chapters';
    protected $primaryKey = 'id';
    protected $cast = [
        'chapter_number' => 'float'
    ];
}
