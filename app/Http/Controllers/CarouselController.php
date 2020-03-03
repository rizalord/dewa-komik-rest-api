<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Carousel;
use stdClass;
use \App\AdminHistory;
use App\Manga;
use Illuminate\Support\Facades\Auth;

class CarouselController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Carousel::orderBy('created_at' , 'desc')->get() , 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $store = new Carousel();
        $store->url = $request->data['imgSrc'];
        $store->id_manga = $request->data['id_manga'];
        $store->save();

        $manga = Manga::find($request->data['id_manga']);

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " added a new carousel for manga '$manga->name'";
        $history->save();

        $message = new stdClass();
        $message->status = true;
        $message->message = 'Store Complete!';

        return response()->json($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Carousel::find($id), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $img = $request->data['imgSrc'];
        $id = $request->data['id'];
        $id_manga = $request->data['id_manga'];

        $manga = Manga::find($request->data['id_manga']);

        $obj = Carousel::find($id);
        $obj->url = $img;
        $obj->id_manga = $id_manga;
        $obj->save();

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " has edited '$manga->name' carousel";
        $history->save();

        $data = new stdClass();
        $data->status = true;
        $data->message = "Edit Success";

        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $cr = Carousel::find($request->data['id']);
        $manga = Manga::find($cr->id_manga);
        Carousel::find($request->data['id'])->delete();

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " deleted '$manga->name' carousel";
        $history->save();

        $data = new stdClass();
        $data->status = true;
        $data->message = "Delete Success";

        return response()->json($data, 200);
    }
}
