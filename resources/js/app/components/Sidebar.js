import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
    render() {
        return (
            <div class="site-menubar">
                <ul class="site-menu">
                    <li class="site-menu-item active">
                        <Link to="/admin/dashboard">
                            <a>
                                <i
                                    class="site-menu-icon md-view-dashboard"
                                    aria-hidden="true"
                                ></i>
                                <span class="site-menu-title">Dashboard</span>
                            </a>
                        </Link>
                    </li>
                    <li class="site-menu-item has-sub">
                        <a href="javascript:void(0)">
                            <i
                                class="site-menu-icon md-view-compact"
                                aria-hidden="true"
                            ></i>
                            <span class="site-menu-title">Manga</span>
                            <span class="site-menu-arrow"></span>
                        </a>
                        <ul class="site-menu-sub">
                            <li class="site-menu-item">
                                <Link to="/admin/manga">
                                    <a>
                                        <span class="site-menu-title">
                                            Manga List
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            <li class="site-menu-item">
                                <Link to="/admin/chapters">
                                    <a>
                                        <span class="site-menu-title">
                                            Manga Chapters
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li class="site-menu-item has-sub">
                        <Link to="/admin/collection">
                            <a>
                                <i
                                    class="site-menu-icon md-collection-bookmark"
                                    aria-hidden="true"
                                ></i>
                                <span class="site-menu-title">Collections</span>
                            </a>
                        </Link>
                    </li>
                    <li class="site-menu-item has-sub">
                        <Link to="/admin/carousel">
                            <a>
                                <i
                                    class="site-menu-icon md-view-carousel"
                                    aria-hidden="true"
                                ></i>
                                <span class="site-menu-title">Carousel</span>
                            </a>
                        </Link>
                    </li>
                    <li class={`site-menu-item has-sub`}>
                        <a href="javascript:void(0)">
                            <i
                                class="site-menu-icon md-accounts-alt"
                                aria-hidden="true"
                            ></i>
                            <span class="site-menu-title">Accounts</span>
                            <span class="site-menu-arrow"></span>
                        </a>
                        <ul class="site-menu-sub">
                            <li class="site-menu-item">
                                <Link to="/admin/users">
                                    <a>
                                        <span class="site-menu-title">
                                            Manage Users
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            <li
                                class={`site-menu-item  ${
                                    this.props.isMaster ? "" : "d-none"
                                }`}
                            >
                                <Link to="/admin/admins">
                                    <a>
                                        <span class="site-menu-title">
                                            Manage Admins
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li class="site-menu-item has-sub">
                        <Link to="/admin/activity">
                            <a>
                                <i
                                    class="site-menu-icon md-time-restore"
                                    aria-hidden="true"
                                ></i>
                                <span class="site-menu-title">Activities</span>
                            </a>
                        </Link>
                    </li>
                    <li class="site-menu-item has-sub">
                        <Link to="/admin/messages">
                            <a>
                                <i
                                    class="site-menu-icon md-comment-alt-text"
                                    aria-hidden="true"
                                ></i>
                                <span class="site-menu-title">Messages</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}
