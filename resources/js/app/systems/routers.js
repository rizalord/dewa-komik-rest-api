import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './../components/Navbar';
import Sidebar from './../components/Sidebar';
import MangaListScreen from './../Screens/MangaListScreen';
import MangaChapterScreen from './../Screens/MangaChapterScreen';
import CollectionScreen from './../Screens/CollectionScreen';
import CarouselScreen from './../Screens/CarouselScreen';
import ManageUserScreen from './../Screens/UserScreen';
import ManageAdminScreen from './../Screens/AdminScreen';
import ActivityScreen from './../Screens/ActivityScreen';
import MessageScreen from "./../Screens/MessageScreen";
import DashboardScreen from "./../Screens/DashboardScreen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import $ from "jquery";
import Constant from './constants';

export default class Routers extends Component {

    constructor(props){
        super(props);

        this.state = {
            isMaster : false,
            image : null,
            openPhoto : false,
            imgUrl : '',
            imgShow : false
        } ;

        this._getAdminData = this._getAdminData.bind(this);
        this.renderChangePhotoBox = this.renderChangePhotoBox.bind(this);
        this.openPhotoFunc = this.openPhotoFunc.bind(this);
        this.onSubmitPhoto = this.onSubmitPhoto.bind(this);
        this._getAdminData();
    }

    async imageExists(image_url) {
        
        var http = new XMLHttpRequest();

        http.open("HEAD", image_url, false);
        http.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );
        http.send();

        return http.status != 404;

    }

    onSubmitPhoto(){
        fetch(Constant.apiUrl + "set/photo/admin", {
            method : 'POST',
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: this.state.imgUrl })
        })
        .then(res => res.json())
        .then(res => {
                this.setState(
                    { 
                        openPhoto: false ,
                        image : res.status == true ? this.state.imgUrl : this.state.image
                    }
                );
        });
        
    }

    async _getAdminData(){
        await fetch(document.querySelector('body').getAttribute('data-url') + '/api/get/admin/data' )
            .then(res => res.json())
            .then(res => {
                this.setState({
                    isMaster: res.isMaster,
                    image:
                        res.image != null
                            ? res.image
                            : "https://i.kym-cdn.com/photos/images/facebook/000/221/732/1324619671001.jpg",
                    imgShow: true,
                    imgUrl:
                        res.image != null
                            ? res.image
                            : "https://i.kym-cdn.com/photos/images/facebook/000/221/732/1324619671001.jpg"
                });
            });
    }

    openPhotoFunc(){
        this.setState({
            openPhoto : true
        })
    }


    renderChangePhotoBox(){
        return (
            <div
                className="boxChangePhoto"
                style={{ display: this.state.openPhoto ? "block" : "none" }}
            >
                <div className="boxInsidePhoto">
                    <a
                        className="closeBtnForPhoto"
                        href="#"
                        onClick={() => {
                            this.setState({ openPhoto: false });
                        }}
                    >
                        <i className="icon md-close closeX" />
                    </a>
                    <img
                        src={this.state.imgUrl}
                        className="imgBoxInsidePhoto"
                        style={{
                            display:
                                this.state.imgShow == true ? "block" : "none"
                        }}
                    />

                    <input
                        type="text"
                        class={`form-control`}
                        placeholder="Image link"
                        value={this.state.imgUrl}
                        onChange={({ target }) => {
                            this.setState({
                                imgUrl : target.value,
                                imgShow: this.imageExists(target.value)
                                    ? true
                                    : false
                            });
                        }}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginTop: 20 }}
                        onClick={this.onSubmitPhoto}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Router>
                {/* Modal Change Photo */}
                { this.renderChangePhotoBox() }
                {/* END Modal Change Photo */}
                <Navbar image={this.state.image} openPhoto={this.openPhotoFunc} />
                <Sidebar isMaster={this.state.isMaster} />

                <Switch>
                    <Route path="/admin/dashboard">
                        <DashboardScreen />
                    </Route>
                    <Route path="/admin/users">
                        <ManageUserScreen />
                    </Route>
                    <Route path="/admin/admins">
                        <ManageAdminScreen />
                    </Route>
                    <Route path="/admin/manga">
                        <MangaListScreen />
                    </Route>
                    <Route path="/admin/chapters">
                        <MangaChapterScreen />
                    </Route>
                    <Route path="/admin/collection">
                        <CollectionScreen />
                    </Route>
                    <Route path="/admin/carousel">
                        <CarouselScreen />
                    </Route>
                    <Route path="/admin/activity">
                        <ActivityScreen />
                    </Route>
                    <Route path="/admin/messages">
                        <MessageScreen />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Routers />, document.getElementById('root'));
}
