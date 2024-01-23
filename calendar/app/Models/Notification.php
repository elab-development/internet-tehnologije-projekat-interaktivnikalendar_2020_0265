<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'slug', 'hoursBefore', 'event_id'];
    protected $guarded = ['id'];

    public function event(){
        return $this->belongsTo(Event::class);
    }
}
