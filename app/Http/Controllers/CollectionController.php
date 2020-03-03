<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;
use \App\Collection;
use \App\AdminHistory;
use Illuminate\Support\Facades\Auth;

class CollectionController extends Controller
{

    public function getAll(){
        return Collection::all();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($take = 5)
    {
        $data = DB::select('select * from manga order by views DESC');
        $data = array_map(function ($e) {
            $e->genres = explode(', ', $e->genres);
            $e->genres = $e->genres[0];
            return $e;
        }, $data);

        // popularing genre
        $newData = $this->sortPopularGenre($data, $take);

        $collections = [] ;
        foreach(Collection::all() as $data){
            $collections[] = $data['genre'];
        }
        $temp = [];

        foreach ($newData as $value) {
            if(!in_array( $value , $collections)){
                $temp[] = $value;
            }
        }
        

        return response()->json($temp, 200);
    }

    private function sortPopularGenre($arr, $take)
    {

        $genreTmp = [];
        foreach ($arr as $index => $data) {
            $genre = (string) $data->genres;
            $genreTmp[] = [$genre][0];
        }

        $genre = [];
        foreach (array_unique($genreTmp) as $key => $value) {
            $genre[] = $value;
        }


        return array_splice($genre, 0, $take);
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
        $data = new stdClass();
        // FORM GENRE
        $img = $request->data['imgSrc'];
        $genre = $request->data['genre'];
        // END FORM GENRE

        $coll = new collection();
        $coll->genre = $genre;
        $coll->url = $img;
        $coll->save();

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " added a new collection for genre '$genre'";
        $history->save();

        $data->status = true;
        $data->message = 'Successfully Added';
        
        return response()->json($data, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Collection::find($id), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {   

        $dataEdit = Collection::find($request->data['id']);
        $dataEdit->url = $request->data['imgSrc'];

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " has edited '$dataEdit->genre' collection";
        $history->save();

        $dataEdit->genre = $request->data['genre'];
        $dataEdit->save();

        $data = new stdClass();
        $data->status = true;
        $data->message = 'Data Succesfully Edited!';
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $genre = Collection::find($request->data['id']);
        Collection::find($request->data['id'])->delete();

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " has deleted '$genre->genre' collection";
        $history->save();

        $data = new stdClass();
        $data->status = true;
        
        return response()->json($data, 200);
    }
}
