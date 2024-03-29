<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'firebase' => [
        'database_url' => env('FIREBASE_DATABASE_URL', 'https://dewa-komik-759ae.firebaseio.com'),
        'project_id' => env('FIREBASE_PROJECT_ID', 'dewa-komik-759ae'),
        'private_key_id' => env('FIREBASE_PRIVATE_KEY_ID', 'c3f812d077db556de561af3a4872214d8888653e'),
        // replacement needed to get a multiline private key from .env 
        'private_key' => str_replace("\\n", "\n", env('FIREBASE_PRIVATE_KEY', "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQz0yYxA2nAM6B\n6OrOr7KPb3Y4Cu9aVR5gkeitc9H2BocFzcRG+2kr1scoKT1W24/Zie1w9nL+7LaD\nMKzw21yCtLcziud9aYG58EQuPq+l+7xWQN5TnHb7EdgtLMHUzCrlNjnON78jWTyT\nGbkHvOgABSgZdIwWNdBht/eri7GIp6bE21KWXsOgU56h1ijiHjQLG6lYAK8x5yMe\noL9GdI31OVjE0V00Wdhk8o/lGe0xyB++1l3gHiHF9ZE5eVmKNTytDAFvdeNjDs5R\nQMVwU1obwE51lcO6N1exdLY4LaiwRLS/CvBF17L4rRUAqdwZk+5+/lHAXMHDuVFj\njJrRv3w7AgMBAAECggEAPoheRX+tIP7WWURSEWy/mkIEktr/fDtyefQoTM2bKsUg\nqYXKSoGfKPBMu0PCaWEejsTGFWbQ4HQuYlJw8D6ZUVFibe6izcWLgo4oNPsz6g7e\nA6ywiDSa0yywYzL8p0gvbm5TWGUMej8Oq3TwGxehGORyclEbZMlf6uvHoZmXpLcZ\n1DL4Hdmj69gnzcNGvXf5ZF/skkuBtuNkuMNOqoDykM4fTEKcy5+YK5jnQc2BvHyu\naecRzEzlYUfXbwILlvBBSTmEFTApAiwVj2rYrCglSkjqMSoiRL6goNZcMWTR/4Ve\n5r9d/S45JcVP5xxo5xwPC564w+UhdWEqf9jsKmBHkQKBgQDx+JKf16ucr3i+h/wE\nqFA9VY4WI2D1ixAJ9CqbFDl8WQytAiQoGxfiVcvr3RWuF99u0iOuBTkFWQ/QwiDx\nQs/f8Dgyquop0Yf/sVI2+hE3AzpGsRY7Bv/eHqHM3ZWjPKfOScz8KrDQoHCT57OO\nNGIylnvHI5oDU4IYiT8HBEnIiwKBgQDc6ojhsO97UEE5/ESpdNLxEDOsO7z5rx8a\nn+zWx0jtPBYhWZXngXvgnO8NBeMVKN1P1w8UHcX/7epNHf89dqlSrLvya3R1hbHh\na6eFGma38ZDyuIAW1m+NCqLLGJEnvsqUc45ONDtgvLSCctJlJS4bGsNtpBleR+ci\n0mtRCqXhEQKBgCekctkvK1V7RgvpGXfl32d9Cc9EspDn3JPU5doMYTKnIDWEAUp0\nzd/t8H/O88tW6+srEF9lSac/pSCtfVopeQcWQw7CA6UgR+izM2YAaCucIsMMJjk7\nd1X7rMR0lRxuRou8eZHiqJ81edwxfLBSkrf5AYRpp8TdvJWqfqH2qOPrAoGBAKhf\nBHZm4Q8uCpiEIVy50i+ydn+VhCEUjHNBYkQL3RQakI9YdPzd3ilB0pwtWXZ+D7bT\nJQXi705w6PtfmnIg50pApnpL1ZXgkMNKxoGWrqURMrUbU1yUkK6BZbO/BJqzOjjM\nnbAS9RJ0oGsv0hUOskYsLrh4snD+AjazAuHgaK7RAoGABsJnT8miCE1NLmE8ZfdB\nkiLS243HxVMnmhuXAT4KUHtCRcjLbW0dAObMY/jN9mmPtHb3j21ze0bgAVfea2rl\nQhy5dzqqaA+iCHBYbno6uSvg8bMzftJJUXbFOsngEDe1xwxtomVNeljfCvhcCaOk\nKs4Q0XSGiNXpNsLH0SmLt+g=\n-----END PRIVATE KEY-----\n")),
        'client_email' => env('FIREBASE_CLIENT_EMAIL', 'firebase-adminsdk-25akh@dewa-komik-759ae.iam.gserviceaccount.com'),
        'client_id' => env('FIREBASE_CLIENT_ID', '100876807536777589487'),
        'client_x509_cert_url' => env('FIREBASE_CLIENT_x509_CERT_URL', 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-25akh%40dewa-komik-759ae.iam.gserviceaccount.com')
    ],


];
