import React, { Component } from 'react';

export default class ContactList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div class="page-aside">
                <div class="page-aside-switch">
                    <i class="icon md-chevron-left" aria-hidden="true"></i>
                    <i class="icon md-chevron-right" aria-hidden="true"></i>
                </div>
                <div class="page-aside-inner">
                    <div class="input-search">
                        <button class="input-search-btn" type="submit">
                            <i class="icon md-search" aria-hidden="true"></i>
                        </button>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                        }}>
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Search Keyword"
                                value={this.props.keyword}
                                onChange={({target}) => this.props.changeKeyword(target.value)}
                            />
                        </form>
                    </div>

                    <div class="app-message-list page-aside-scroll">
                        <div data-role="container">
                            <div data-role="content">
                                <ul class="list-group">
                                    {this.props.contacts.map((e, i) => (
                                        <li
                                            class={`list-group-item ${
                                                e.id == this.props.activeContact
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >
                                            <a
                                                class="media"
                                                href="javascript:void(0)"
                                                style={{
                                                    textDecoration: "none"
                                                }}
                                                onClick={() => {
                                                    this.props.changeActive(e.id);
                                                }}
                                            >
                                                <div class="pr-20">
                                                    <a
                                                        class="avatar"
                                                        href="javascript:void(0)"
                                                    >
                                                        <img
                                                            class="img-fluid"
                                                            src={
                                                                e.image != null
                                                                    ? e.image
                                                                    : "https://i.kym-cdn.com/photos/images/facebook/000/221/732/1324619671001.jpg"
                                                            }
                                                        />
                                                    </a>
                                                </div>
                                                <div class="media-body">
                                                    <h5 class="mt-0 mb-5">
                                                        {e.name}
                                                    </h5>
                                                    <span class="media-time">
                                                        {e.last_chat == '' ? 'No chat yet' : e.last_chat}
                                                    </span>
                                                </div>
                                                {
                                                    e.unreaded != 0 
                                                    ? (<div class="pl-20">
                                                            <span class="badge badge-pill badge-danger">
                                                                {e.unreaded}
                                                            </span>
                                                        </div>)
                                                    : null

                                                }
                                                
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}