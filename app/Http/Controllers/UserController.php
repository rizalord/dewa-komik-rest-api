<?php

namespace App\Http\Controllers;

use App\AdminHistory;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use stdClass;

class UserController extends Controller
{
    public function getAllUser(){
        return User::where('role_id' , 0)->get();
    }

    public function banUser($email){
        $banned = User::where('email' , $email)->first('is_banned');
        $banned = $banned->is_banned;
        if($banned == 0 ){
            $banned = 1;
        }else{
            $banned = 0;
        }
        $bannedStatus = !$banned;

        User::where('email' , $email)->update(['is_banned' => $banned]);
        $data = new stdClass();
        $data->status = true;

        $user = User::where('email' , $email)->first();

        $history = new AdminHistory();
        $history->id_admin = Auth ::user()->id;
        $ide = Auth::user()->email == env('MASTER_EMAIL') ? '[Admin]' : "[". Auth::user()->name ."]";
        $banOrNot = $banned == 1 ? 'ban' : 'unban';
        $history->message = $ide . " has $banOrNot user with id $user->id [$user->name]";
        $history->save();
        
        return response()->json($data, 200);
    }
}
