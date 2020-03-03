<?php

namespace App\Http\Middleware;

use Closure;
use \App\User;

class MobileAuthorization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');
        $exploded = explode('Lt2d' , $token);
        $userId = end($exploded);
        $asyncToken = explode('::' ,  $exploded[0]);
        $asyncToken = end($asyncToken);


        

        if (User::where('fbId' , $userId)->count() != 1){
            $data = (object) ['status' => false  , 'message' => "User not registered!"];
            return response()->json($data, 403);
        }else{
            if(User::where([
                ['api_token', $asyncToken],
                ['fbId' , $userId]
            ])->count() != 1){
                $data = (object) ['status' => false  , 'message' => "Unidentified Time YourTime : $time , ourTime :  " . strtotime(now()) . ' jarak: ' . $range];
                return response()->json($data, 403);
            }else{
                return $next($request);
            }
        }
        
        
        
    }
}
