<?php

namespace App\Http\Controllers;

use App\Chapter;
use App\Manga;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;

class DashboardController extends Controller
{
    public function index(){
        $data = new stdClass();
        $data->totalUser = User::where('role_id' , 0)->count();
        $data->totalAdmin = User::where('role_id' , 1)->count();
        $data->totalManga = Manga::count();
        $data->totalChapter = Chapter::count();

        // Trending
        $time = strtotime(now());
        
        $db = DB::table('historyview')->select(DB::raw("id_manga"))->where('created_at', ">", DB::raw('NOW() - INTERVAL 1 WEEK'))->groupBy(('id_manga'))->orderByDesc(DB::raw("COUNT(*)"))->get()->toArray();
        
        $db = array_map(function($e) {
            return $e->id_manga;
        } ,$db);

        $manga = DB::table('manga')->whereIn('id_manga' , $db)->get(['id_manga' , 'genres' , 'name' , 'image'])->toArray();
        $manga = array_map(function($e) {
            $e->genres = explode(', ' , $e->genres);
            $e->genres = end($e->genres);
            return $e;
        } , $manga);

        // Latest Manga
        $data->latestManga = Manga::orderBy('created_at' , 'DESC')->get(['name' , 'image', 'created_at'])->take(5);

        // Latest Chapter
        $firstData = Chapter::orderBy('created_at' , 'DESC')->get()->take(5)->toArray();

        $data->latestChapter = array_map(function($e){
            $e['manga'] = Manga::where('id_manga' , $e['id_chapters'])->first(['name' , 'image']);
            return $e;
        } ,  $firstData);
        
        
        $data->trending = array_splice($manga , 0 , 5);
        return response()->json($data, 200);
    }
}
