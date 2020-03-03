<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description" content="bootstrap material admin template">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>DewaKomik | Administrator</title>

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
    <link rel="stylesheet" href="{{ asset('') }}assets/examples/css/dashboard/v1.css">
    <link rel="stylesheet" href="{{ asset('') }}assets/examples/css/apps/message.css">
    
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
    <link rel="stylesheet" href="{{ asset('') }}assets/css/site.min.css">


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


    <style>

        .boxChangePhoto {
            position: fixed;
            left : 0;
            right : 0;
            top : 0;
            bottom : 0;
            z-index: 112;
            background-color: rgba(0,0,0,0.1);
        }

        .boxInsidePhoto {
            position: absolute;
            background-color:  white;
            top : 52%;
            left : 50%;
            transform: translate(-50% , -50%);
            width : 400px;
            height : auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 15px;
            border: 2px solid rgba(0,0,0,0.25);
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 50px;
            padding-bottom: 30px;
        }

        .imgBoxInsidePhoto { 
            width : 300px;
            height : 300px;
            margin-bottom: 30px;
            border-radius: 300px;
            object-fit: cover;
            border: 2px solid rgba(0,0,0,0.25);
            background-color: whitesmoke;
        }

        .closeBtnForPhoto {
            position: absolute;
            top : 15px;
            right : 15px;
        }

        .closeX {
            font-size: 22px;
        }

        
        .imageTrending {
            height : 240px;
        }

        @media (max-width : 1192px){
            .imageTrending {
                height : 200px;
            }
        }

        @media (max-width : 1026px){
            .imageTrending {
                height : 150px;
            }
        }

        @media (max-width : 861px){
            .imageTrending {
                height : 110px;
            }
        }

        @media (max-width : 767px){
            .imageTrending {
                height : auto;
            }
        }
        
    </style>

</head>

<body class="animsition site-navbar-small dashboard app-message page-aside-scroll page-aside-left mm-wrapper site-menubar-fold" data-url="{{ url('/') }}">

        {{-- container --}}
            <div id="root"></div>
        {{-- end of container --}}
        

        {{-- footer --}}
        <script src="{{ asset('') }}global/vendor/jquery/jquery.js"></script>
        <script src="./../js/app.js"></script>

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
        <script src="{{ asset('') }}global/vendor/chartist/chartist.min.js"></script>
        <script src="{{ asset('') }}global/vendor/chartist-plugin-tooltip/chartist-plugin-tooltip.js"></script>
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

        <script src="{{ asset('') }}assets/js/App/Message.js"></script>
        <script src="{{ asset('') }}assets/examples/js/apps/message.js"></script>


    </body>
</html>
