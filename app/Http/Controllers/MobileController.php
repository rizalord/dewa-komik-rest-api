<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Manga;
use \App\Chapter;
use \App\ReadChapter;
use \App\Collection;
use \App\Carousel;
use \App\HistoryView;
use \App\User;
use \App\Bookmark;
use \App\Comment;
use \App\Like;
use stdClass;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class MobileController extends Controller
{
    public function newchapter($take = 5){
        $firstData = Chapter::orderBy('created_at' , 'DESC')->take($take)->get()->unique('id_chapters');
        $secondData = [];
        foreach ($firstData as $key => $value) {
            $value['realImage'] = Manga::find($value['id_chapters'], ['image'])['image'];
            $value['nameOfManga'] = Manga::find($value['id_chapters'], ['name'])['name'];
            $value['genre'] = explode(', ' , Manga::find($value['id_chapters'], ['genres'])['genres'])[0];
            $secondData[] = $value;
        }

        $data = new stdClass();
        $data->status = true;
        $data->data = $secondData;
        return response()->json($data, 200);
    }

    public function show($request){
        $manga = Manga::find($request);
        $manga['totalChapter'] = Chapter::where('id_chapters' , $request)->count();
        $manga['genres'] = explode(', ' , $manga['genres']);
        $manga['chapters'] = Chapter::where('id_chapters' , $request)->orderBy('chapter_number' , 'DESC')->get();
        $manga['commentTotal'] = Comment::where('manga_id' , $request)->count();
        $data = new stdClass();
        $data->status = true;
        $data->data = $manga;
        return response()->json($data, 200);
    }

    public function read($request){
        $id = Chapter::where('id', $request)->select('id_chapters')->firstOrFail()['id_chapters'];
        $manga = Manga::find($id);
        $manga->views += 1;
        $manga->save();

        $history = new HistoryView();
        $history->id_manga = $id;
        $history->save();

        $data = new stdClass();
        $data->status = true;
        $data->data = ReadChapter::where('id_read_chapter' , $request)->orderBy('img_number')->get();
        return response()->json($data, 200);
    }

    public function mostPopular(){
        $data = Manga::orderBy('views', 'desc')->take(6)->get();
        $newData = [];
        foreach ($data as $key => $value) {
            $value['genres'] = explode(', ' , $value['genres']);
            $value['genres'] = array_slice($value['genres'] , 0 , 2 );
            $newData[] = $value;

            $value['lastEp'] = Chapter::where('id_chapters' , $value['id_manga'] )->select('chapter_number')->orderBy('chapter_number' , 'desc') ->first()['chapter_number'];
        }

        $newArrLength = ceil( count($newData) / 2 );
        
        // combine array
        $arr = [];
        $tmp = [];
        for ($i=1; $i <= count($newData) ; $i++) { 
            $tmp[] = $newData[$i-1];
            if( $i % 2 == 0 ){
                $arr[] = $tmp;
                $tmp = [];
            }

            if($i == count($newData) && count($tmp) == 1){
                $arr[] = $tmp;
                $tmp = [];
            }
        }

        $data = new stdClass();
        $data->status = true;
        $data->data = $arr;
        return response()->json($data, 200);
    }

    public function schedule(){
        $data = new stdClass();
        $data->status = true;
        $data->data = $this->newchapter(9);
        return response()->json($data, 200);
    }

    public function getMangaByGenre($request , $order , $sort , $page){

        
        $sort = strtoupper($sort);
        $mangaList = null;
        $order = $order == 'latestupdate' ? 'updated_at' : $order;

        $mangaList = strtolower($request) != 'all'
            ? DB::table('manga')->where('genres', 'like', '%' . $request  . '%')->orderBy($order, $sort)->paginate(8 , ['*'] , 'page' , $page)
            : DB::table('manga')->orderBy($order, $sort)->paginate(8 , ['*'] , 'page' , $page);
        
        
        
        

        $data = new stdClass();
        $data->status = true;
        $data->data = $mangaList;
        $data->fill = count($mangaList) == 0 ? false : true ;
        return response()->json($data, 200 );
    }

    public function getPopularGenre($take = 5){
        $data = DB::select('select * from manga order by views DESC');
        $data = array_map(function($e){
            $e->genres = explode(', ',$e->genres);
            $e->genres = $e->genres[0];
            return $e;
        } , $data);
        
        // popularing genre
        $newData = $this->sortPopularGenre($data , $take);
        $data = new stdClass();
        $data->status = true;
        $data->data = $newData;
        return response()->json($data, 200);
    }

    private function sortPopularGenre($arr , $take){
        
        $genreTmp = [];
        foreach ($arr as $index => $data) {
            $genre = (String) $data->genres;
            $genreTmp[] = [$genre][0];
        }
        
        $genre = [];
        foreach (array_unique($genreTmp) as $key => $value) {
            $genre[] = $value;
        }


        $data = new stdClass();
        $data->status = true;
        $data->data = array_splice($genre , 0 , $take) ;
        return response()->json($data, 200);

    }

    public function getTrendsManga(){
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

        $data = new stdClass();
        $data->status = true;
        $data->data = array_splice($manga , 0 , 5);

        return response()->json($data, 200);
    }

    public function getAllCollection()
    {
        $data = new stdClass();
        $data->status = true;
        $data->data = Collection::all();
        return response()->json($data, 200);
    }

    public function getAllCarousel(Request $request)
    {
        $data = new stdClass();
        $data->status = true;
        $data->data = Carousel::orderBy('updated_at' , 'desc')->get();
        return response()->json($data, 200);
    }

    public function getRecommend($request){
        $manga = null;

        $manga = Manga::where('genres', 'like',  '%' . $request . '%')->get()->take(10)->toArray();
        shuffle($manga);
        $manga = array_map(function ($e) {
            $e['genres'] = explode(', ', $e['genres']);
            $e['genres'] = end($e['genres']);
            return $e;
        }, $manga);
        $manga = array_slice($manga, 0, 5);

        
        $data = new stdClass();
        $data->status = true;
        $data->data = $manga ;
        return response()->json($data, 200);
    }

    public function getRecommended()
    {
        $manga = null;

        $manga = Manga::orderBy('views', 'DESC')->get()->take(10)->toArray();
        shuffle($manga);
        $manga = array_map(function($e){
            $e['genres'] = explode( ', ' , $e['genres']);
            $e['genres'] = end($e['genres']);
            return $e;
        }, $manga);
        $manga = array_slice($manga, 0, 5);


        $data = new stdClass();
        $data->status = true;
        $data->data = $manga ;
        return response()->json($data, 200);
    }

    public function searchManga($request , $page){
        $data = new stdClass();
        $data->status = true;
        $data->data = DB::table('manga')->where('name', 'like', '%' . $request . '%')->paginate(10 , ['*'] , 'page' , $page) ;
        $data->totalData  = DB::table('manga')->where('name' , 'like' , '%' . $request .'%')->count();
        return response()->json($data, 200);
    }


    // Authentication
    public function register(Request $request){

        $user = new User();
        $user->fbId = $request->data['userId'];
        $user->role_id = 0;
        $user->name = $request->data['name'];
        $user->email = $request->data['email'];
        $user->password = Hash::make($request->data['password']);
        $user->api_token = Hash::make(Str::random(60));
        $user->save();


        $data = new stdClass();
        $data->status = true;
        $data->token = $user->api_token;
        

        return response()->json($data, 200);
    }

    public function getUserData($userId){
        $user = User::where('fbId' , $userId)->get()->take(1)[0];
        $user->bookmark = Bookmark::where('userId' , $userId)->get('mangaId')->toArray();
        $user->bookmark = array_map(function ($e) {
            return $e['mangaId'];
        }, $user->bookmark);
        $user->bookmark = Manga::whereIn('id_manga' , $user->bookmark)->get();

        $user->likes = Like::where('userId', $userId)->get('mangaId')->toArray();
        $user->likes = array_map(function($e) {
            return $e['mangaId'];
        } , $user->likes);

        $data = new stdClass();
        $data->status = true;
        $data->data = $user;
        return response()->json($data, 200);
    }

    public function getUserDataByEmail($email){
        $user = User::where('email', $email)->firstOrFail();
        $user->bookmark = Bookmark::where('userId', $user['fbId'])->get('mangaId')->toArray();
        $user->bookmark = array_map(function ($e) {
            return $e['mangaId'];
        }, $user->bookmark);

        $user->likes = Like::where('userId', $user['fbId'])->get('mangaId')->toArray();
        $user->likes = array_map(function ($e) {
            return $e['mangaId'];
        }, $user->likes);

        $data = new stdClass();
        $data->status = true;

        return response()->json($user, 200);
    }

    

    public function getBookmarkComic($request){
        $result = Bookmark::where('userId' , $request)->get()->toArray();
        $result = array_map(function($e) {
            return $e['mangaId'];
        }, $result);
        $result = Manga::whereIn('id_manga' , $result)->get(['id_manga' , 'name' , 'image']);

        $data = new stdClass();
        $data->status = true;
        return response()->json($result, 200);
    }

    


    public function getComment($request)
    {
        $get = DB::table('comments')->where('manga_id', $request)->orderBy('created_at', 'DESC')->get()->toArray();
        $get = array_map(function($e) {
            $e->userId = preg_replace("/[^A-Za-z0-9\-\']/", '', $e->userId);
            $e->userData = User::where('fbId' , $e->userId)->get(['image','name','fbId'])->first();
            return $e;
        } , $get);


        $data = new stdClass();
        $data->status = true;
        $data->data = $get;

        return response()->json($data, 200);
    }

    public function userIsBanned($request){
        $email = $request;
        $data = new stdClass();
        
        if(User::where('email' , $email)->get('is_banned')->count() != 0){
            $data->status = User::where('email' , $email)->first('is_banned')->toArray()['is_banned'] == 1;
        }else{
            $data->status = false;
        }

        return response()->json($data, 200);
        
    }


    /**
     *  POST METHOD
     * */ 

    public function like(Request $request){

        $likes = Like::where([
            ['userId', $request->data['userId']],
            ['mangaId' , $request->data['idManga']]
        ])->get();

        if(count($likes) == 0){
            $newData = new Like();
            $newData->userId = $request->data['userId'];
            $newData->mangaId = $request->data['idManga'];
            $newData->save();

            $newManga = Manga::find($request->data['idManga']);
            $newManga->likes += 1;
            $newManga->save();

        }else{
            Like::where([
                ['userId', $request->data['userId']],
                ['mangaId', $request->data['idManga']]
            ])->delete();

            $newManga = Manga::find($request->data['idManga']);
            $newManga->likes -= 1;
            $newManga->save();
        }

        $data = new stdClass();
        $data->status = true;

        return response()->json($data, 200);
    }


    public function bookmark(Request $request)
    {

        $bookmark = Bookmark::where([
            ['userId', $request->data['userId']],
            ['mangaId', $request->data['idManga']]
        ])->get();

        if (count($bookmark) == 0) {
            $newData = new Bookmark();
            $newData->userId = $request->data['userId'];
            $newData->mangaId = $request->data['idManga'];
            $newData->save();

            $newManga = Manga::find($request->data['idManga']);
            $newManga->bookmarked += 1;
            $newManga->save();
        } else {
            Bookmark::where([
                ['userId', $request->data['userId']],
                ['mangaId', $request->data['idManga']]
            ])->delete();

            $newManga = Manga::find($request->data['idManga']);
            $newManga->bookmarked -= 1;
            $newManga->save();
        }

        $data = new stdClass();
        $data->status = true;

        return response()->json($data, 200);
    }

    public function setComment(Request $request){

        $comment = new Comment();
        $comment->manga_id = $request->data['mangaId'];
        $comment->userId = $request->data['userId'];
        $comment->like = 0;
        $comment->text = $request->data['text'];
        $comment->save();

        $data = new stdClass();
        $data->status = true;
        // ----
        $tmp = $comment;
        $tmp->userId = preg_replace("/[^A-Za-z0-9\-\']/", '', $tmp->userId);
        $tmp->userData = User::where('fbId', $tmp->userId)->get(['image', 'name', 'fbId'])->first();
        // ----
        $data->data = $tmp;
        return response()->json($data, 200);

    }

    public function updateProfile(Request $request){

        $url = $request->data['url'];
        $uId = $request->data['userId'];

        $user = User::where("fbId" , $uId)->firstOrFail();
        $user->image = $url;
        $user->save();

        $data = new stdClass();
        $data->status = true;
        $data->message = "Success";
        
        return response()->json($data, 200);
    }

    public function updateProfileNameEmail(Request $request){

        $fbId = $request->data['fbId'];
        $email = $request->data['email'];
        $user = null;

        $user = User::where('fbId' , $fbId)->firstOrFail();
        $user->name = $request->data['username'];
        if($email != null){
            $user->email = $email;
        }
        $user->save();

        $data = new stdClass();
        $data->status = true;
        $data->message = "Success";

        return response()->json($data, 200);
    }
    
}
