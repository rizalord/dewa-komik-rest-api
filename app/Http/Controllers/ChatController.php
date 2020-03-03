<?php

namespace App\Http\Controllers;

use App\Chat;
use App\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use stdClass;
use Illuminate\Support\Facades\Crypt;

use function PHPSTORM_META\map;

class ChatController extends Controller
{
    public function showContacts($keyword = ''){

        
        

        $user = User::where([
                ['role_id' , 1],
                ['name' , 'like' , '%'. $keyword .'%']
            ])->where('id' , '!=' , Auth::user()->id)->get(['id' , 'name' , 'image' ])->toArray();
        $user = array_map(function($e){
            $e['last_chat'] = Chat::Where('receiver' , Auth::user()->id)
                ->Where('sender' , $e['id'])
                ->orderBy('created_at' , 'desc')
                ->first( 'created_at' ) != null 
                    ? Chat::Where('receiver' , Auth::user()->id)
                        ->Where('sender' , $e['id'])
                        ->orderBy('created_at' , 'desc')
                        ->first( 'created_at' )
                        ->toArray()['created_at'] 
                    : null;
            
            $e['unreaded'] = Chat::where([
                ['sender' , $e['id']],
                ['receiver' , Auth::user()->id],
                ['readed' , 0]
            ])->count();

            if($e['last_chat'] != null){
                $startTime = $e['last_chat'];
                $start_date = new DateTime($e['last_chat']);
                $since_start = $start_date->diff(new DateTime(now()));

                if($since_start->d != 0){
                    $e['last_chat'] = $since_start->d . ' days ago';    
                }else if($since_start->h != 0){
                    $e['last_chat'] = $since_start->h . ' hours ago';    
                }else if($since_start->i != 0){
                    $e['last_chat'] = $since_start->i . ' minutes ago';    
                }else{
                    $e['last_chat'] = $since_start->s . ' seconds ago';    
                }
                
                $e['last_chat_time'] = strtotime(now()) - strtotime( $startTime ) ;
            }else{
                $e['last_chat'] = '';
                $e['last_chat_time'] = strtotime(now()) ;
            }
        
            return $e ;
        } , $user);

        try {
            for ($i=0; $i < count($user) ; $i++) { 
                if($user[$i]['last_chat_time'] > $user[$i+1]['last_chat_time']){
                    $tmp = $user[$i];
                    $user[$i] = $user[$i+1];
                    $user[$i+1] = $tmp;
                }else{
                    $user[$i]=$user[$i];
                }
            }
        } catch (\Throwable $th) {
            
        }


        return $user;
        
    }

    public function getChat($idTarget){
        $myId = Auth::user()->id;
        
        
        $data = new stdClass();
        $data->chats = Chat::where([
            ['sender' , $myId],
            ['receiver' , $idTarget]
        ])
            ->orWhere([
                ['sender' , $idTarget],
                ['receiver' , $myId]
            ])
            ->orderBy('created_at' , 'ASC')
            ->get();

        $data->chats = $data->chats->map(function($item , $key) {
            $item->message = Crypt::decryptString($item->message);
            return $item;
        });

        $simpleArray = [];
        $nestedArray = [];
        $chat = $data->chats;
        $id = null;
        for ($i=0; $i < count($chat) ; $i++) { 
            if($i == 0){
                $id = $chat[$i]->sender;
                $nestedArray[] = $chat[$i];
            }else{
                if($chat[$i]->sender == $id){
                    $nestedArray[] = $chat[$i];
                }else{
                    $simpleArray[] = $nestedArray;   
                    $nestedArray = [];
                    $nestedArray[] = $chat[$i];
                }
            }

            $id = $chat[$i]->sender;
        }

        if(count($nestedArray) != 0){
            $simpleArray[] = $nestedArray;
        }

        Chat::where([
                ['sender' , $idTarget],
                ['receiver' , $myId]
            ])->update(['readed' => 1]);
        

        $data->chats = $simpleArray;
        $data->myImage = Auth::user()->image;
        $data->targetImage = User::where('id' , $idTarget)->first('image')->image;
        $data->myId = $myId;
        $data->targetId = $idTarget;
        return response()->json($data, 200);
    }

    public function post(Request $request){
        $text = $request->data['text'];
        $target = $request->data['targetId'];
        $myId = Auth::user()->id;

        $chat = new Chat();
        $chat->sender = $myId;
        $chat->receiver = $target;
        $chat->message =  Crypt::encryptString( $text );
        $chat->readed = 0;
        $chat->save();

        $repData = $chat;
        $repData->message = Crypt::decryptString($repData->message);

        $data= new stdClass();
        $data->status = true;
        $data->data = $repData;

        return response()->json($data, 200);
    }
}
