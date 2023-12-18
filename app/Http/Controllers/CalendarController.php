<?php

namespace App\Http\Controllers;

use App\Models\Dogadjaj;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function index()
    {

        $events = array();
        $dogadjajs = Dogadjaj::all();
        foreach($dogadjajs as $dogadjaj){
            $events[]=[
                'title' => $dogadjaj->naziv,
                'start' => $dogadjaj->datum_pocetka,
                'end' => $dogadjaj->datum_kraja,

            ];
        }

       return view('calendar.index', ['events' => $events] );
    }


    public function sacuvaj(Request $request){
        
    $request-> validate([
        'naziv'=> 'required|string'
    ]);
    //return $request->all();
    $dogadjaj = Dogadjaj::create([
        'naziv' => $request->naziv,
        'datum_pocetka' => $request->datum_pocetka,
        'datum_kraja' => $request->datum_kraja,
    ]);

    return response()->json($dogadjaj);

    }
}
