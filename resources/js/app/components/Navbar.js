import React, { Component } from 'react';

export default class Navbar extends Component {

    constructor(props){
        super(props);
        
    }


    render(){
        return (
            <nav
                class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega"
                role="navigation"
            >

            
                <div class="navbar-header">
                    <button
                        type="button"
                        class="navbar-toggler hamburger hamburger-close navbar-toggler-left hided"
                        data-toggle="menubar"
                    >
                        <span class="sr-only">Toggle navigation</span>
                        <span class="hamburger-bar"></span>
                    </button>
                    <button
                        type="button"
                        class="navbar-toggler collapsed"
                        data-target="#site-navbar-collapse"
                        data-toggle="collapse"
                    >
                        <i class="icon md-more" aria-hidden="true"></i>
                    </button>
                    <div
                        class="navbar-brand navbar-brand-center site-gridmenu-toggle"
                        data-toggle="gridmenu"
                    >
                        <img
                            class="navbar-brand-logo"
                            src="../assets/images/logo.png"
                            title="Remark"
                        />
                        <span class="navbar-brand-text hidden-xs-down">
                            {" "}
                            Administrator
                        </span>
                    </div>
                    <button
                        type="button"
                        class="navbar-toggler collapsed"
                        data-target="#site-navbar-search"
                        data-toggle="collapse"
                    >
                        <span class="sr-only">Toggle Search</span>
                        <i class="icon md-search" aria-hidden="true"></i>
                    </button>
                </div>

                <div class="navbar-container container-fluid">
                    <div
                        class="collapse navbar-collapse navbar-collapse-toolbar"
                        id="site-navbar-collapse"
                    >
                        <ul class="nav navbar-toolbar">
                            <li
                                class="nav-item hidden-float"
                                id="toggleMenubar"
                            >
                                <a
                                    class="nav-link"
                                    data-toggle="menubar"
                                    href="#"
                                    role="button"
                                >
                                    <i class="icon hamburger hamburger-arrow-left">
                                        <span class="sr-only">
                                            Toggle menubar
                                        </span>
                                        <span class="hamburger-bar"></span>
                                    </i>
                                </a>
                            </li>

                            {/* <li class="nav-item hidden-float">
                        <a class="nav-link icon md-search" data-toggle="collapse" href="#" data-target="#site-navbar-search"
                            role="button">
                            <span class="sr-only">Toggle Search</span>
                        </a>
                        </li> */}
                        </ul>

                        <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link navbar-avatar"
                                    data-toggle="dropdown"
                                    href="#"
                                    aria-expanded="false"
                                    data-animation="scale-up"
                                    role="button"
                                >
                                    <span class="avatar avatar-online">
                                        <img
                                            src={
                                                this.props.image != null
                                                    ? this.props.image
                                                    : "https://i.kym-cdn.com/photos/images/facebook/000/221/732/1324619671001.jpg"
                                            }
                                            alt="..."
                                        />
                                        <i></i>
                                    </span>
                                </a>
                                <div class="dropdown-menu mr-5" role="menu">
                                    <a class="dropdown-item" role="menuitem" onClick={() => {
                                        this.props.openPhoto();
                                    }}>
                                        <i class="icon md-account-circle" aria-hidden="true"></i>
                                        Change Photo
                                    </a>
                                    <a class="dropdown-item" role="menuitem" href={document.querySelector('body').getAttribute('data-url') + '/logout'}>
                                        <i class="icon md-power" aria-hidden="true"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>
                            {/* <li class="nav-item dropdown">
                                <a
                                    class="nav-link"
                                    data-toggle="dropdown"
                                    href="javascript:void(0)"
                                    title="Notifications"
                                    aria-expanded="false"
                                    data-animation="scale-up"
                                    role="button"
                                >
                                    <i
                                        class="icon md-notifications"
                                        aria-hidden="true"
                                    ></i>
                                    <span class="badge badge-pill badge-danger up">
                                        5
                                    </span>
                                </a>
                                <div
                                    class="dropdown-menu dropdown-menu-right dropdown-menu-media"
                                    role="menu"
                                >
                                    <div class="dropdown-menu-header">
                                        <h5>NOTIFICATIONS</h5>
                                        <span class="badge badge-round badge-danger">
                                            New 5
                                        </span>
                                    </div>

                                    <div class="list-group">
                                        <div data-role="container">
                                            <div data-role="content">
                                                <a
                                                    class="list-group-item dropdown-item"
                                                    href="javascript:void(0)"
                                                    role="menuitem"
                                                >
                                                    <div class="media">
                                                        <div class="pr-10">
                                                            <i
                                                                class="icon md-receipt bg-red-600 white icon-circle"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="media-heading">
                                                                A new order has
                                                                been placed
                                                            </h6>
                                                            <time
                                                                class="media-meta"
                                                                datetime="2017-06-12T20:50:48+08:00"
                                                            >
                                                                5 hours ago
                                                            </time>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a
                                                    class="list-group-item dropdown-item"
                                                    href="javascript:void(0)"
                                                    role="menuitem"
                                                >
                                                    <div class="media">
                                                        <div class="pr-10">
                                                            <i
                                                                class="icon md-account bg-green-600 white icon-circle"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="media-heading">
                                                                Completed the
                                                                task
                                                            </h6>
                                                            <time
                                                                class="media-meta"
                                                                datetime="2017-06-11T18:29:20+08:00"
                                                            >
                                                                2 days ago
                                                            </time>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a
                                                    class="list-group-item dropdown-item"
                                                    href="javascript:void(0)"
                                                    role="menuitem"
                                                >
                                                    <div class="media">
                                                        <div class="pr-10">
                                                            <i
                                                                class="icon md-settings bg-red-600 white icon-circle"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="media-heading">
                                                                Settings updated
                                                            </h6>
                                                            <time
                                                                class="media-meta"
                                                                datetime="2017-06-11T14:05:00+08:00"
                                                            >
                                                                2 days ago
                                                            </time>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a
                                                    class="list-group-item dropdown-item"
                                                    href="javascript:void(0)"
                                                    role="menuitem"
                                                >
                                                    <div class="media">
                                                        <div class="pr-10">
                                                            <i
                                                                class="icon md-calendar bg-blue-600 white icon-circle"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="media-heading">
                                                                Event started
                                                            </h6>
                                                            <time
                                                                class="media-meta"
                                                                datetime="2017-06-10T13:50:18+08:00"
                                                            >
                                                                3 days ago
                                                            </time>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a
                                                    class="list-group-item dropdown-item"
                                                    href="javascript:void(0)"
                                                    role="menuitem"
                                                >
                                                    <div class="media">
                                                        <div class="pr-10">
                                                            <i
                                                                class="icon md-comment bg-orange-600 white icon-circle"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="media-heading">
                                                                Message received
                                                            </h6>
                                                            <time
                                                                class="media-meta"
                                                                datetime="2017-06-10T12:34:48+08:00"
                                                            >
                                                                3 days ago
                                                            </time>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown-menu-footer">
                                        <a
                                            class="dropdown-menu-footer-btn"
                                            href="javascript:void(0)"
                                            role="button"
                                        >
                                            <i
                                                class="icon md-settings"
                                                aria-hidden="true"
                                            ></i>
                                        </a>
                                        <a
                                            class="dropdown-item"
                                            href="javascript:void(0)"
                                            role="menuitem"
                                        >
                                            All notifications
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link"
                                    data-toggle="dropdown"
                                    href="javascript:void(0)"
                                    title="Messages"
                                    aria-expanded="false"
                                    data-animation="scale-up"
                                    role="button"
                                >
                                    <i
                                        class="icon md-email"
                                        aria-hidden="true"
                                    ></i>
                                    <span class="badge badge-pill badge-info up">
                                        3
                                    </span>
                                </a>
                                <div
                                    class="dropdown-menu dropdown-menu-right dropdown-menu-media"
                                    role="menu"
                                >
                                    <div class="dropdown-menu-header">
                                        <h5>MESSAGES</h5>
                                        <span class="badge badge-round badge-info">
                                            New 3
                                        </span>
                                    </div>

                                    <div class="list-group" role="presentation">
                                        <div data-role="container">
                                            <div data-role="content">
                                                <a
                                                    class="list-group-item dropdown-item"
                                                    href="javascript:void(0)"
                                                    role="menuitem"
                                                >
                                                    <div class="media">
                                                        <div class="pr-10">
                                                            <span class="avatar avatar-sm avatar-online">
                                                                <img
                                                                    src="../../global/portraits/2.jpg"
                                                                    alt="..."
                                                                />
                                                                <i></i>
                                                            </span>
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="media-heading">
                                                                Mary Adams
                                                            </h6>
                                                            <div class="media-meta">
                                                                <time datetime="2017-06-17T20:22:05+08:00">
                                                                    30 minutes
                                                                    ago
                                                                </time>
                                                            </div>
                                                            <div class="media-detail">
                                                                Anyways, i would
                                                                like just do it
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a
                                                    class="list-group-item dropdown-item"
                                                    href="javascript:void(0)"
                                                    role="menuitem"
                                                >
                                                    <div class="media">
                                                        <div class="pr-10">
                                                            <span class="avatar avatar-sm avatar-off">
                                                                <img
                                                                    src="../../global/portraits/3.jpg"
                                                                    alt="..."
                                                                />
                                                                <i></i>
                                                            </span>
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="media-heading">
                                                                Caleb Richards
                                                            </h6>
                                                            <div class="media-meta">
                                                                <time datetime="2017-06-17T12:30:30+08:00">
                                                                    12 hours ago
                                                                </time>
                                                            </div>
                                                            <div class="media-detail">
                                                                I checheck the
                                                                document. But
                                                                there seems
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a
                                                    class="list-group-item dropdown-item"
                                                    href="javascript:void(0)"
                                                    role="menuitem"
                                                >
                                                    <div class="media">
                                                        <div class="pr-10">
                                                            <span class="avatar avatar-sm avatar-busy">
                                                                <img
                                                                    src="../../global/portraits/4.jpg"
                                                                    alt="..."
                                                                />
                                                                <i></i>
                                                            </span>
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="media-heading">
                                                                June Lane
                                                            </h6>
                                                            <div class="media-meta">
                                                                <time datetime="2017-06-16T18:38:40+08:00">
                                                                    2 days ago
                                                                </time>
                                                            </div>
                                                            <div class="media-detail">
                                                                Lorem ipsum Id
                                                                consectetur et
                                                                minim
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a
                                                    class="list-group-item dropdown-item"
                                                    href="javascript:void(0)"
                                                    role="menuitem"
                                                >
                                                    <div class="media">
                                                        <div class="pr-10">
                                                            <span class="avatar avatar-sm avatar-away">
                                                                <img
                                                                    src="../../global/portraits/5.jpg"
                                                                    alt="..."
                                                                />
                                                                <i></i>
                                                            </span>
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="media-heading">
                                                                Edward Fletcher
                                                            </h6>
                                                            <div class="media-meta">
                                                                <time datetime="2017-06-15T20:34:48+08:00">
                                                                    3 days ago
                                                                </time>
                                                            </div>
                                                            <div class="media-detail">
                                                                Dolor et irure
                                                                cupidatat
                                                                commodo nostrud
                                                                nostrud.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="dropdown-menu-footer"
                                        role="presentation"
                                    >
                                        <a
                                            class="dropdown-menu-footer-btn"
                                            href="javascript:void(0)"
                                            role="button"
                                        >
                                            <i
                                                class="icon md-settings"
                                                aria-hidden="true"
                                            ></i>
                                        </a>
                                        <a
                                            class="dropdown-item"
                                            href="javascript:void(0)"
                                            role="menuitem"
                                        >
                                            See all messages
                                        </a>
                                    </div>
                                </div>
                            </li> */}
                        </ul>
                    </div>

                    <div
                        class="collapse navbar-search-overlap"
                        id="site-navbar-search"
                    >
                        <form role="search">
                            <div class="form-group">
                                <div class="input-search">
                                    <i
                                        class="input-search-icon md-search"
                                        aria-hidden="true"
                                    ></i>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="site-search"
                                        placeholder="Search..."
                                    />
                                    <button
                                        type="button"
                                        class="input-search-close icon md-close"
                                        data-target="#site-navbar-search"
                                        data-toggle="collapse"
                                        aria-label="Close"
                                    ></button>
                                </div>
                            </div>
                        </form>
                        <form
                            id="logout-form"
                            action={this.url}
                            method="POST"
                        ></form>
                    </div>
                </div>
            </nav>
        );
    }
}
