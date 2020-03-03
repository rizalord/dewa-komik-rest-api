import React, { Component } from "react";

export default class ChatBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="page-main">
                <div
                    class="app-message-chats"
                    style={{ height: window.innerHeight - (80 + 68.576) }}
                >
                    <button
                        type="button"
                        id="historyBtn"
                        class="btn btn-round btn-default btn-flat primary-500"
                    >
                        History Messages
                    </button>
                    <div class="chats">
                        {this.props.chats.map((e, index) => {
                            return (
                                <div
                                    class={`chat ${
                                        e[0].sender == this.props.targetData.id
                                            ? "chat-left"
                                            : ""
                                    }`}
                                >
                                    <div class="chat-avatar">
                                        <a
                                            class="avatar"
                                            data-toggle="tooltip"
                                            href="#"
                                            data-placement="right"
                                            title=""
                                        >
                                            <img
                                                src={
                                                    e[0].sender ==
                                                    this.props.targetData.id
                                                        ? this.props.targetData
                                                              .image == null
                                                            ? "https://i.kym-cdn.com/photos/images/facebook/000/221/732/1324619671001.jpg"
                                                            : this.props
                                                                  .targetData
                                                                  .image
                                                        : this.props.selfData
                                                              .image == null
                                                        ? "https://i.kym-cdn.com/photos/images/facebook/000/221/732/1324619671001.jpg"
                                                        : this.props.selfData
                                                              .image
                                                }
                                            />
                                        </a>
                                    </div>
                                    <div class="chat-body">
                                        {e.map(element => (
                                            <div class="chat-content">
                                                <p>{element.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        {/* <div class="chat">
                            <div class="chat-avatar">
                                <a
                                    class="avatar"
                                    data-toggle="tooltip"
                                    href="#"
                                    data-placement="right"
                                    title=""
                                >
                                    <img
                                        src="../../../../global/portraits/4.jpg"
                                        alt="June Lane"
                                    />
                                </a>
                            </div>
                            <div class="chat-body">
                                <div class="chat-content">
                                    <p>Hello. What can I do for you?</p>
                                </div>
                            </div>
                        </div>
                        <div class="chat chat-left">
                            <div class="chat-avatar">
                                <a
                                    class="avatar"
                                    data-toggle="tooltip"
                                    href="#"
                                    data-placement="left"
                                    title=""
                                >
                                    <img
                                        src="../../../../global/portraits/5.jpg"
                                        alt="Edward Fletcher"
                                    />
                                </a>
                            </div>
                            <div class="chat-body">
                                <div class="chat-content">
                                    <p>I'm just looking around.</p>
                                    <p>
                                        Will you tell me something about
                                        yourself?{" "}
                                    </p>
                                </div>
                                <div class="chat-content">
                                    <p>Are you there? That time!</p>
                                </div>
                            </div>
                        </div>
                        <div class="chat">
                            <div class="chat-avatar">
                                <a
                                    class="avatar"
                                    data-toggle="tooltip"
                                    href="#"
                                    data-placement="right"
                                    title=""
                                >
                                    <img
                                        src="../../../../global/portraits/4.jpg"
                                        alt="June Lane"
                                    />
                                </a>
                            </div>
                            <div class="chat-body">
                                <div class="chat-content">
                                    <p>Where?</p>
                                </div>
                                <div class="chat-content">
                                    <p>
                                        OK, my name is Limingqiang. I like
                                        singing, playing basketballand so on.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p class="time">1 hours ago</p>
                        <div class="chat chat-left">
                            <div class="chat-avatar">
                                <a
                                    class="avatar"
                                    data-toggle="tooltip"
                                    href="#"
                                    data-placement="left"
                                    title=""
                                >
                                    <img
                                        src="../../../../global/portraits/5.jpg"
                                        alt="Edward Fletcher"
                                    />
                                </a>
                            </div>
                            <div class="chat-body">
                                <div class="chat-content">
                                    <p>You wait for notice.</p>
                                </div>
                                <div class="chat-content">
                                    <p>Consectetuorem ipsum dolor sit?</p>
                                </div>
                                <div class="chat-content">
                                    <p>OK?</p>
                                </div>
                            </div>
                        </div>
                        <div class="chat">
                            <div class="chat-avatar">
                                <a
                                    class="avatar"
                                    data-toggle="tooltip"
                                    href="#"
                                    data-placement="right"
                                    title=""
                                >
                                    <img
                                        src="../../../../global/portraits/4.jpg"
                                        alt="June Lane"
                                    />
                                </a>
                            </div>
                            <div class="chat-body">
                                <div class="chat-content">
                                    <p>OK!</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <form
                    class="app-message-input"
                    onSubmit={this.props.submit}
                    style={{ height: 80 }}
                >
                    <div class="input-group form-material">
                        {/* <span class="input-gro  up-btn">
                        <a href="javascript: void(0)" class="btn btn-pure btn-default icon md-camera"></a>
                        </span> */}
                        <input
                            class="form-control"
                            type="text"
                            placeholder="Type message here ..."
                            value={this.props.text}
                            onChange={({ target }) => {
                                this.props.changeText(target.value);
                            }}
                        />
                        <span class="input-group-btn">
                            <button
                                type="submit"
                                class="btn btn-pure btn-default icon md-mail-send"
                            ></button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}
