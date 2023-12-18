<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dogadjaj extends Model
{
    use HasFactory;
    protected $fillable = ['naziv', 'datum_pocetka', 'datum_kraja'];
}
