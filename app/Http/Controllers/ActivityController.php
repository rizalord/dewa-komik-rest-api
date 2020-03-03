<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\AdminHistory;
use App\User;
use stdClass;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = AdminHistory::orderBy('created_at' , 'desc')->get()->toArray();
        $data = array_map(function($e) {
            $tmp = User::where('id' , $e['id_admin'])->first(['name','email']);
            $name = $tmp['email'] == env('MASTER_EMAIL') ? 'Admin' : $tmp['name'];
            $e['name'] = $name;
            return $e;
        } , $data);
        $temp = new stdClass();
        $temp->status = true;
        $temp->data = $data;
        return response()->json($temp, 200);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
    public function destroy($id)
    {
        //
    }
}
