import React from "react";
import MUIDataTable from "mui-datatables";
import Constant from "../systems/constants";
import swal from "sweetalert2";
import ContactList from './../components/ContactList';
import ChatBox from './../components/ChatBox';

export default class ActivityScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            contactActiveIndex: 0,
            contactActiveId: null,
            self_id: null,
            target_id: null,
            self_image: null,
            target_image: null,
            chats: [],

            // Input Text
            textChat: "",
            keywordSearch : ''
        };

        this.contactActiveId = null

        this.changeActiveContact = this.changeActiveContact.bind(this);
        this._getContactList = this._getContactList.bind(this);
        this._getChatList = this._getChatList.bind(this);
        this.changeText = this.changeText.bind(this);
        this.submitText  = this.submitText.bind(this);
        this.changeKeyword = this.changeKeyword.bind(this);
        this.postText = this.postText.bind(this);
    }

    changeKeyword(text){
        this.setState({
            keywordSearch : text
        });
    }

    changeText(value){
        this.setState({
            textChat : value
        })
    }

    submitText(event){
        event.preventDefault();
        let text = this.state.textChat;
        this.setState({
            textChat : ''
        } , () => {
            this.postText(text);
        })
    }

    async postText(text){
        const targetId = this.state.target_id;
        console.log('masuk sini');
        fetch(Constant.apiUrl + "post/chat", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    targetId: targetId,
                    text: text
                }
            })
        })
            .then(res => res.json())
            .then(res => {
                if(res.status){
                    let data = res.data;
                    try {
                        if(this.state.chats[this.state.chats.length - 1][0].sender == this.state.self_id){
                            let tmp = this.state.chats;
                            tmp[this.state.chats.length - 1].push(data);
                            this.setState({
                                chats : tmp
                            });
                        }else{
                            if(this.state.chats.length != 0){
                                let tmp = this.state.chats;
                                let arrEmp = [];
                                arrEmp.push(data);
                                tmp.push(arrEmp);
                                this.setState({
                                    chats: tmp
                                });
                            }
                            
                        }
                    } catch (error) {
                        let tmp = this.state.chats;
                        let arrEmp = [];
                        arrEmp.push(data);
                        tmp.push(arrEmp);
                        this.setState({
                            chats: tmp
                        });
                        
                    }
                    
                }
            })
            .catch(err => console.log(err));
    }

    async componentDidMount(){
        document.title = 'Messages | Dewa Komik'
        
        this.interval = setInterval(() => {
            this._getContactList();
            this._getChatList();
        }, 3000);
        
        await this._getContactList();
        this._getChatList();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _getChatList(index = 0){
        
        fetch(Constant.apiUrl + "get/chat/" + this.contactActiveId)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    chats: res.chats,
                    self_id: res.myId,
                    target_id: res.targetId,
                    self_image: res.myImage,
                    target_image: res.targetImage
                });
            });

    }

    async _getContactList(){
        await fetch(Constant.apiUrl + 'get/contacts/' + this.state.keywordSearch)
            .then(res => res.json())
            .then(res => {
                let unreadedTotal = 0;
                res.forEach(e => {
                    unreadedTotal += e.unreaded
                });

                document.title = `Messages | Dewa Komik ${unreadedTotal != 0 ? '(' + unreadedTotal + ')' : ''}`;

                if(this.state.contactActiveId == null){
                    this.setState({
                        contacts: res,
                        contactActiveId : res[0].id
                    });    
                    this.contactActiveId = res[0].id;
                }else{
                    this.setState({
                        contacts: res
                    });
                }
                
            })
    }

    async changeActiveContact(id){
        this.contactActiveId = id;
        this.setState({
            contactActiveId: id,
            self_id: null,
            target_id: null,
            self_image: null,
            target_image: null,
            chats: [],
            contacts : this.state.contacts.map((e,i) => {
                if(e.id == id){
                    e.unreaded = 0;
                }
                return e;
            })
        } , async () => {
            await this._getChatList();
        });
    }

    render() {
        return (
            <div>
                <div class="page">
                    <ContactList
                        contacts={this.state.contacts}
                        activeContact={this.contactActiveId}
                        changeActive={this.changeActiveContact}
                        keyword={this.state.keywordSearch}
                        changeKeyword={this.changeKeyword}
                    />

                    <ChatBox
                        selfData={{
                            id: this.state.self_id,
                            image: this.state.self_image
                        }}
                        targetData={{
                            id: this.state.target_id,
                            image : this.state.target_image
                        }}
                        chats={this.state.chats}
                        text={this.state.textChat}
                        changeText={this.changeText}
                        submit={this.submitText}
                    />
                </div>
            </div>
        );
    }
}
