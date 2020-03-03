<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Manga;
use \App\Chapter;
use \App\ReadChapter;
use \App\HistoryView;
use \App\Bookmark;
use \App\Comment;
use \App\Like;
use \App\Carousel;
use \App\User;
use stdClass;
use \App\AdminHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    
    public function index(){
        return Manga::orderBy('created_at', 'DESC')->get();
    }

    public function getToken(){
        return csrf_token();
    }

    public function getSpecificManga($request){
        $manga = Manga::find($request);

        return response()->json($manga, 200,);
    }

    public function store(Request $request){

        $manga = new Manga();
        $manga->name = $request->data['mangaTitle'];
        $manga->image = $request->data['mangaImg'];
        $manga->genres = implode(', ' , $request->data['mangaGenre']);
        $manga->status = $request->data['mangaStatus'] == 'ongoing' ? 1 : 0;
        $manga->featured = $request->data['mangaFeatured'] == 'yes' ? 1 : 0;
        $manga->author = $request->data['mangaAuthor'] ;
        $manga->summary = $request->data['mangaSummary'] ;
        $manga->views = 0;
        $manga->bookmarked = 0;
        $manga->likes = 0;
        $manga->created_at = now();
        $manga->save();

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " added a new manga '$manga->name'";
        $history->save();

        // Return Response
        $data = new stdClass();
        $data->message = "Manga Added Succesfully";
        $data->status = true;

        return response()->json($data, 200);
        
    }

    public function editManga(Request $request){

        $manga = Manga::find($request->data['idManga']);
        $manga->name = $request->data['mangaTitle'];
        $manga->image = $request->data['mangaImg'];
        $manga->genres = implode(', ', $request->data['mangaGenre']);
        $manga->status = $request->data['mangaStatus'] == 'ongoing' ? 1 : 0;
        $manga->featured = $request->data['mangaFeatured'] == 'yes' ? 1 : 0;
        $manga->author = $request->data['mangaAuthor'];
        $manga->summary = $request->data['mangaSummary'];
        $manga->views = 0;
        $manga->bookmarked = 0;
        $manga->likes = 0;
        $manga->save();

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " has changed '$manga->name' manga";
        $history->save();

        // Return Response
        $data = new stdClass();
        $data->message = "Manga Successfully Edited!";
        $data->status = true;

        return response()->json( $data, 200);
    }

    public function deleteManga($request){

        $manga = Manga::find($request);
        
        Manga::find($request)->delete();
        $id = Chapter::where('id_chapters' , $request)
            ->select('id')->get();

        Chapter::where('id_chapters' , $request)->delete();
        ReadChapter::whereIn('id_read_chapter' , $id)->delete();
        HistoryView::where('id_manga' , $request)->delete();
        Bookmark::where('mangaId' , $request)->delete();
        Comment::where('manga_id' , $request)->delete();
        Like::where('mangaId' , $request)->delete();
        Carousel::where('id_manga' , $request)->delete();

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $history->message = $ide . " has deleted '$manga->name' manga";
        $history->save();
        
        $data = new stdClass();
        $data->status = true;
        $data->message = "Manga has been deleted!";

        return response()->json($data, 200);
    }

    public function getAdminData(){
        $data = Auth::user();
        $data->isMaster = $data->email == env('MASTER_EMAIL');
        return $data;
    }

    public function getMultipleAdminData(){
        $data = Auth::user();
        $data->isMaster = $data->email == env('MASTER_EMAIL');

        if($data->isMaster){
            $data = new stdClass();
            $data->status = true;
            $data->data = User::where([
                ['role_id' , 1],
                ['email', '!=' , env('MASTER_EMAIL')]
            ])->get();
            return response()->json($data, 200);
        }

        $mess = new stdClass();
        $mess->status = false;
        $mess->message = 'Unauthorized Access!';
        return $mess;
    }

    public function deleteAdmin(Request $request){
        $data = Auth::user();
        $data->isMaster = $data->email == env('MASTER_EMAIL');

        $targetName = User::where('id' ,$request->id )->first('name');

        if($data->isMaster){

            User::find($request->id)->delete();

            $history = new AdminHistory();
            $history->id_admin = $data->id;
            $history->message = "[Admin] Master has kick $targetName->name";
            $history->save();

            $mess = new stdClass();
            $mess->status = true;
            return response()->json($mess, 200);
        }

        

        $mess = new stdClass();
        $mess->status = false;

        return response()->json($mess, 200);

    }

    public function addAdmin(Request $request){
        $user = new User();
        $user->role_id = 1;
        $user->is_banned = 0;
        $user->name = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->api_token = null;
        $user->fbId = null;
        $user->save();

        $history = new AdminHistory();
        $history->id_admin = Auth::user()->id;
        $history->message = "[Admin] Master has add $user->name to our Family";
        $history->save();

        $mess = new stdClass();
        $mess->status = true;        

        return response()->json($mess, 200);
    }

    public function setPhotoProfile(Request $request){
        $myId = Auth::user()->id;
        $urlImg = $request->data;

        User::where('id' , $myId)->update(['image' => $urlImg]);
        
        $mess = new stdClass();
        $mess->status = true;        

        return response()->json($mess, 200);
    }

}
