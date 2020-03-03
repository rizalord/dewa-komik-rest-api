<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Manga;
use \App\Chapter;
use \App\ReadChapter;
use \App\AdminHistory;
use Illuminate\Support\Facades\Auth;
use stdClass;

class ChapterController extends Controller
{
    public function index(){
        $data = Chapter::all();
        $data = $data->sortByDesc('created_at')->values()->all();
        foreach ($data as $key => $value) {
            $data[$key]['mangaTitle'] = Manga::find($value['id_chapters'] , ['name'])['name'];
        }

        return $data;
    }

    public function getMangaList(Request $request){
        if(isset($request['chapternum'])  && isset($request['id_manga'])){
            $res = Chapter::where([
                    ['id_chapters' , '=' , $request['id_manga']],
                    ['chapter_number' , '=' , $request['chapternum']]
                ]
            )->get();

            $data = new stdClass();
            $data->status = count($res) == 0 ? false : true;
            $data->message = count($res) == 0 ? 'Not Match!' : 'Match!';

            return response()->json($data, 200);
        }else{
            return Manga::select('name' , 'id_manga')->get();
        }
        
    }

    public function store(Request $request){
        

        $imgList = [];
        foreach ($request->data['imgList'] as $key ) {
            $imgList[] = $key['text'];
        }

        // change updated at
        $up = Manga::find($request->data['mangaId']);
        $up->updated_at = now();
        $up->save();


        // assigning
        $chapter = new Chapter();
        $chapter->id_chapters = $request->data['mangaId'];
        $chapter->title = $request->data['chapterTitle'];
        $chapter->chapter_number = $request->data['chapterNum'];
        $chapter->image = $request->data['imgUrl'];
        $chapter->save();
        
        // assigning to other table (read chapter)
        $newArray = [];
        foreach ($imgList as $index => $title) {
            $newArray[] = [
                'id_read_chapter' => $chapter->id,
                'img_number' => $index,
                'img_link' => $title,
                'created_at' => now()
            ];
        }

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " updated '$up->name' to chapter $chapter->chapter_number";
        $history->save();

        ReadChapter::insert($newArray);
        $data = new stdClass();
        $data->status = true;
        $data->message = 'Chapter successfully added!';

        return response()->json($data, 200 );
    }

    public function show($request){
        $data = Chapter::findOrFail($request);
        $data['name'] = Manga::find($data['id_chapters'], ['name'])['name'];
        $data['imgList'] = ReadChapter::select('img_link')->where('id_read_chapter', $request)->get();
        

        return $data;

    }

    public function edit(Request $request){
        $prevData = $request->data['prevData'];
        $nextData = $request->data['nextData'];

        $chapter = Chapter::find($prevData['id']);
        $chapter->title = $nextData['chapterTitle'];
        $chapter->chapter_number = $nextData['chapterNum'];
        $chapter->image = $nextData['imgUrl'];
        $chapter->save();

        ReadChapter::select('img_link')->where('id_read_chapter', $prevData['id'])->delete();


        // edit read chapter table
        $imgList = [];
        foreach ($nextData['imgList'] as $key) {
            $imgList[] = $key['text'];
        }

        $newArray = [];
        foreach ($imgList as $index => $title) {
            $newArray[] = [
                'id_read_chapter' => $prevData['id'],
                'img_number' => $index,
                'img_link' => $title,
                'created_at' => now()
            ];
        }

        ReadChapter::insert($newArray);

        $idCh = Manga::find($chapter->id_chapters);
        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " has changed chapter $chapter->chapter_number of '$idCh->name'";
        $history->save();

        $data = new stdClass();
        $data->status = true;
        $data->message = 'Chapter successfully edited!';

        return response()->json($data, 200);
    }

    public function delete(Request $request){
        $temp = Chapter::find($request->data);
        $chapter = Chapter::find($request->data)->delete();
        $read = ReadChapter::where('id_read_chapter' , $request->data)->delete();

        $data = new stdClass();
        $data->status = true;
        $data->message = 'Chapter successfully deleted!';

        $idCh = Manga::find($temp->id_chapters);
        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " has deleted chapter $temp->chapter_number of '$idCh->name'";
        $history->save();

        return response()->json($data, 200);
    }
}
