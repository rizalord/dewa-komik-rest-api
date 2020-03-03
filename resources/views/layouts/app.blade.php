{{-- <!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Admin - Login</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    Dewa Komik
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html> --}}



<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description" content="bootstrap material admin template">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Dewa Komik - Login</title>

    <link rel="apple-touch-icon" href="{{ asset('') }}assets/images/apple-touch-icon.png">
    <link rel="shortcut icon" href="{{ asset('')}}assets/images/favicon.ico">

    <!-- Stylesheets -->
    
    <link rel="stylesheet" href="{{ asset('') }}global/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{ asset('') }}global/css/bootstrap-extend.min.css">
    <link rel="stylesheet" href="{{ asset('') }}assets/css/site.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    
    

    <!-- Plugins -->
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/animsition/animsition.css">
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/asscrollable/asScrollable.css">
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/switchery/switchery.css">
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/intro-js/introjs.css">
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/slidepanel/slidePanel.css">
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/jquery-mmenu/jquery-mmenu.css">
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/flag-icon-css/flag-icon.css">
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/waves/waves.css">
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/chartist/chartist.css">
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/jvectormap/jquery-jvectormap.css">
    <link rel="stylesheet" href="{{ asset('') }}global/vendor/chartist-plugin-tooltip/chartist-plugin-tooltip.css">
    <link rel="stylesheet" href="{{ asset('')}}assets/examples/css/dashboard/v1.css">
    <link rel="stylesheet" href="{{ asset('')}}assets/examples/css/pages/login-v3.css">
    
    {{-- <link rel="stylesheet" href="cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">  --}}

    <link rel="stylesheet" href="../../../global/vendor/datatables.net-bs4/dataTables.bootstrap4.css">
    <link rel="stylesheet" href="../../../global/vendor/datatables.net-fixedheader-bs4/dataTables.fixedheader.bootstrap4.css">
    <link rel="stylesheet" href="../../../global/vendor/datatables.net-fixedcolumns-bs4/dataTables.fixedcolumns.bootstrap4.css">
    <link rel="stylesheet" href="../../../global/vendor/datatables.net-rowgroup-bs4/dataTables.rowgroup.bootstrap4.css">
    <link rel="stylesheet" href="../../../global/vendor/datatables.net-scroller-bs4/dataTables.scroller.bootstrap4.css">
    <link rel="stylesheet" href="../../../global/vendor/datatables.net-select-bs4/dataTables.select.bootstrap4.css">
    <link rel="stylesheet" href="../../../global/vendor/datatables.net-responsive-bs4/dataTables.responsive.bootstrap4.css">
    <link rel="stylesheet" href="../../../global/vendor/datatables.net-buttons-bs4/dataTables.buttons.bootstrap4.css">
    <link rel="stylesheet" href="../../assets/examples/css/tables/datatable.css">


    <!-- Fonts -->
    <link rel="stylesheet" href="{{ asset('') }}global/fonts/material-design/material-design.min.css">
    <link rel="stylesheet" href="{{ asset('') }}global/fonts/brand-icons/brand-icons.min.css">
    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic'>

    <!--[if lt IE 9]>
    <script src="{{ asset('') }}global/vendor/html5shiv/html5shiv.min.js"></script>
    <![endif]-->

    <!--[if lt IE 10]>
    <script src="{{ asset('') }}global/vendor/media-match/media.match.min.js"></script>
    <script src="{{ asset('') }}global/vendor/respond/respond.min.js"></script>
    <![endif]-->

    <!-- Scripts -->
    <script src="{{ asset('') }}global/vendor/breakpoints/breakpoints.js"></script>
    <script>
        Breakpoints();
    </script>

  </head>
  <body class="animsition page-login-v3 layout-full">


    <!-- Page -->
    <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">>
      <div class="page-content vertical-align-middle">
        <div class="panel">
          <div class="panel-body">
            <div class="brand">
              <img class="brand-img" src="../../assets//images/logo-colored.png" alt="...">
              <h2 class="brand-text font-size-18">Dewa Komik</h2>
            </div>
            <form method="POST" action="{{ route('login') }}" autocomplete="off">
                @csrf
              <div class="form-group form-material floating" data-plugin="formMaterial">
                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" autofocus>
                <label class="floating-label">Email</label>
                @error('email')
                        <span class="invalid-feedback mt-5" style="text-align: left!important; margin-top : 15px;" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                @enderror
              </div>
              <div class="form-group form-material floating" data-plugin="formMaterial">
                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password">
                <label class="floating-label">Password</label>

                @error('password')
                    <span class="invalid-feedback mt-5" style="text-align: left!important; margin-top : 15px;" role="alert" >
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
              </div>
              <div class="form-group clearfix">
                <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-lg float-left">
                  <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                  <label for="inputCheckbox">Remember me</label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-block btn-lg mt-40">
                  {{ __('Login') }}
              </button>
            </form>
            
          </div>
        </div>

      </div>
    </div>
    <!-- End Page -->


    {{-- footer --}}
        <script src="{{ asset('') }}global/vendor/jquery/jquery.js"></script>
        <script src="js/app.js"></script>

        <!-- Core  -->
        <script src="{{ asset('') }}global/vendor/babel-external-helpers/babel-external-helpers.js"></script>
        <script src="{{ asset('') }}global/vendor/popper-js/umd/popper.min.js"></script>
        <script src="{{ asset('') }}global/vendor/bootstrap/bootstrap.js"></script>
        <script src="{{ asset('') }}global/vendor/animsition/animsition.js"></script>
        <script src="{{ asset('') }}global/vendor/mousewheel/jquery.mousewheel.js"></script>
        <script src="{{ asset('') }}global/vendor/asscrollbar/jquery-asScrollbar.js"></script>
        <script src="{{ asset('') }}global/vendor/asscrollable/jquery-asScrollable.js"></script>
        <script src="{{ asset('') }}global/vendor/waves/waves.js"></script>
        
        <!-- Plugins -->
        <script src="{{ asset('') }}global/vendor/jquery-mmenu/jquery.mmenu.min.all.js"></script>
        <script src="{{ asset('') }}global/vendor/switchery/switchery.js"></script>
        <script src="{{ asset('') }}global/vendor/intro-js/intro.js"></script>
        <script src="{{ asset('') }}global/vendor/screenfull/screenfull.js"></script>
        <script src="{{ asset('') }}global/vendor/slidepanel/jquery-slidePanel.js"></script>
        {{-- <script src="{{ asset('') }}global/vendor/chartist/chartist.min.js"></script> --}}
        {{-- <script src="{{ asset('') }}global/vendor/chartist-plugin-tooltip/chartist-plugin-tooltip.js"></script> --}}
        <script src="{{ asset('') }}global/vendor/jvectormap/jquery-jvectormap.min.js"></script>
        <script src="{{ asset('') }}global/vendor/jvectormap/maps/jquery-jvectormap-world-mill-en.js"></script>
        <script src="{{ asset('') }}global/vendor/matchheight/jquery.matchHeight-min.js"></script>
        <script src="{{ asset('') }}global/vendor/peity/jquery.peity.min.js"></script>
        <script src="{{ asset('') }}global/vendor/datatables.net/jquery.dataTables.js"></script>
        <script src="{{ asset('') }}global/vendor/datatables.net-bs4/dataTables.bootstrap4.js"></script>
        <script src="{{ asset('') }}global/vendor/asrange/jquery-asRange.min.js"></script>
        <script src="{{ asset('') }}global/vendor/bootbox/bootbox.js"></script>
        
        <!-- Scripts -->
        <script src="{{ asset('') }}global/js/Component.js"></script>
        <script src="{{ asset('') }}global/js/Plugin.js"></script>
        <script src="{{ asset('') }}global/js/Base.js"></script>
        <script src="{{ asset('') }}global/js/Config.js"></script>
        
        <script src="{{ asset('')}}assets/js/Section/Menubar.js"></script>
        <script src="{{ asset('')}}assets/js/Section/Sidebar.js"></script>
        <script src="{{ asset('')}}assets/js/Section/PageAside.js"></script>
        <script src="{{ asset('')}}assets/js/Section/GridMenu.js"></script>
        
        <!-- Config -->
        <script src="{{ asset('') }}global/js/config/colors.js"></script>
        <script src="{{ asset('')}}assets/js/config/tour.js"></script>
        <script>
            Config.set('assets', '{{ asset('')}}assets');
        </script>
        
        <!-- Page -->
        <script src="{{ asset('')}}assets/js/Site.js"></script>
        <script src="{{ asset('') }}global/js/Plugin/asscrollable.js"></script>
        <script src="{{ asset('') }}global/js/Plugin/slidepanel.js"></script>
        <script src="{{ asset('') }}global/js/Plugin/switchery.js"></script>
        <script src="{{ asset('') }}global/js/Plugin/matchheight.js"></script>
        <script src="{{ asset('') }}global/js/Plugin/jvectormap.js"></script>
        <script src="{{ asset('') }}global/js/Plugin/peity.js"></script>
        <script src="{{ asset('') }}global/js/Plugin/datatables.js"></script>
        
        <script src="{{ asset('') }}assets/examples/js/tables/datatable.js"></script>
        <script src="{{ asset('') }}assets/examples/js/uikit/icon.js"></script>
        
        <script src="{{ asset('')}}assets/examples/js/dashboard/v1.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    
    <script>
      (function(document, window, $){
        'use strict';
    
        var Site = window.Site;
        $(document).ready(function(){
          Site.run();
        });
      })(document, window, jQuery);
    </script>
    
  </body>
</html>
