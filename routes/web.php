<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// mobile
Route::middleware('guest')->group(function(){
    Route::get("/api/mobile/newchapter", 'MobileController@newchapter');
    Route::get("/api/mobile/schedule", 'MobileController@schedule');
    Route::get("/api/mobile/popular", 'MobileController@mostPopular');
    Route::get("/api/mobile/popular/genre", 'MobileController@getPopularGenre');
    Route::get("/api/mobile/genre/{genre?}/{order?}/{sort?}/{page?}", 'MobileController@getMangaByGenre');
    Route::get("/api/mobile/detail/{id_manga}", 'MobileController@show');
    Route::get("/api/mobile/read/{id}", 'MobileController@read');
    Route::get("/api/mobile/collection", 'MobileController@getAllCollection');
    Route::get("/api/mobile/carousel", 'MobileController@getAllCarousel');
    Route::get("/api/mobile/recommend", 'MobileController@getRecommended');
    Route::get("/api/mobile/recommend/{genre}", 'MobileController@getRecommend');
    Route::get("/api/mobile/trend", 'MobileController@getTrendsManga');
    Route::get("/api/mobile/search/{search}/{page?}", 'MobileController@searchManga');
    Route::get("/api/mobile/user/data/{userId}", 'MobileController@getUserData');
    
    Route::get("/api/mobile/user/bookmark/{userId}", 'MobileController@getBookmarkComic');
    Route::get("/api/mobile/comment/{id?}", 'MobileController@getComment');
    
    Route::post("/api/mobile/user/like", 'MobileController@like');
    Route::post("/api/mobile/user/bookmark", 'MobileController@bookmark');
    Route::post("/api/mobile/comment/", 'MobileController@setComment');
    Route::post("/api/mobile/user/profile", 'MobileController@updateProfile');
    Route::post("/api/mobile/user/nameemail", 'MobileController@updateProfileNameEmail');
});
Route::post("/api/mobile/user/register", 'MobileController@register');
Route::get("/api/mobile/user/data/email/{email}", 'MobileController@getUserDataByEmail');
Route::get("/api/mobile/user/isbanned/{email}", 'MobileController@userIsBanned');





// non-mobile
Route::middleware('auth')->group(function(){
    Route::get("/api/manga", 'AdminController@index');
    Route::get("/api/manga/list", 'ChapterController@getMangaList');
    Route::get('/api/manga/{id_manga}', 'AdminController@getSpecificManga');
    Route::get('api/token' , 'AdminController@getToken');
    Route::get('api/chapter' , 'ChapterController@index');
    Route::get('api/chapter/{id}', 'ChapterController@show');
    Route::get("/api/genre/popular", 'CollectionController@index');
    Route::get("/api/collections", 'CollectionController@getAll');
    Route::get("/api/collections/show/{id}", 'CollectionController@show');
    Route::get("/api/carousel", 'CarouselController@index');
    Route::get("/api/carousel/show/{id}", 'CarouselController@show');
    Route::get('api/get/user' , 'UserController@getAllUser');
    Route::get('api/get/ban/{email}' , 'UserController@banUser');
    Route::get('api/get/activity', 'ActivityController@index');
    Route::get('api/get/admin/data' , 'AdminController@getAdminData');
    Route::get('api/get/admin/multiple/data' , 'AdminController@getMultipleAdminData');
    Route::get('api/get/contacts/{keyword?}' , 'ChatController@showContacts');
    Route::get('api/get/chat/{id}' , 'ChatController@getChat');
    Route::get('api/get/dashboard' , 'DashboardController@index');
    Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
    Route::post('/api/manga', 'AdminController@store');
    Route::post('/api/chapter', 'ChapterController@store');
    Route::post("/api/collections", 'CollectionController@store');
    Route::post("/api/carousel", 'CarouselController@store');
    Route::post("/api/add/new/admin", 'AdminController@addAdmin');
    Route::post("/api/set/photo/admin", 'AdminController@setPhotoProfile');
    Route::post('api/post/chat' , 'ChatController@post');
    Route::put('/api/manga/{id_manga}', 'AdminController@editManga');
    Route::put('/api/chapter/{id}', 'ChapterController@edit');
    Route::put("/api/collections", 'CollectionController@edit');
    Route::put("/api/carousel", 'CarouselController@edit');
    Route::delete('/api/manga/{id_manga}', 'AdminController@deleteManga');
    Route::delete('/api/chapter/{id}', 'ChapterController@delete');
    Route::delete("/api/collections", 'CollectionController@destroy');
    Route::delete("/api/carousel", 'CarouselController@destroy');
    Route::delete("/api/admin/delete" , 'AdminController@deleteAdmin');

    Route::view('/admin/{path?}', 'welcome')
    ->where('path', '.*')
    ->name('welcome');
    

});
    





Auth::routes();
