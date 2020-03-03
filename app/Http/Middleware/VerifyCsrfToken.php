<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Indicates whether the XSRF-TOKEN cookie should be set on the response.
     *
     * @var bool
     */
    protected $addHttpCookie = true;

    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/api/mobile/user/register',
        '/api/mobile/user/like',
        '/api/mobile/user/bookmark',
        '/api/mobile/comment',
        '/api/mobile/user/profile',
        '/api/mobile/user/nameemail',
    ];
}
