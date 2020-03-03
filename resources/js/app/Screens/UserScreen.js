import React from "react";
import MUIDataTable from "mui-datatables";
import Constant from "../systems/constants";

export default class UserScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: []
        };

        this.tableForm = [
            {
                name: "id",
                label: "id",
                options : {
                    display : 'excluded'
                }
            },
            {
                name: "name",
                label: "Name",
                sortable: true
            },
            {
                name: "email",
                label: "Email",
                sortable: true
            },
            {
                name: "created_at",
                label: "Date of Join",
                sortable: true
            },
            {
                name: "is_banned",
                label: "Action",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <button
                                data-id={value}
                                type="button"
                                data-target="#deleteManga"
                                class={`btn d-block w-100 my-1 btn-${value == 0 ? 'danger' : 'primary'} `}
                                onClick={e => {
                                    this.banFunc(e.target.parentNode.parentNode.children[3].innerHTML );
                                }}
                            >
                                {value == 0 ? "Ban" : "Unban"}
                            </button>
                        );
                    }
                }
            }
        ];

        this.banFunc = this.banFunc.bind(this)
    }

    

    async banFunc(email){
        await fetch(Constant.apiUrl + `get/ban/${email}`)
            .then(res => res.json())
            .then(res => {
                if(res.status == true){
                    this._getAllUser();
                }
            })

    }

    componentDidMount() {
        this._getAllUser();
        document.title = 'Manage Users | Dewa Komik';
    }

    async _getAllUser() {
        await this.setState({
            userData : []
        })
        await fetch(Constant.apiUrl + "get/user")
            .then(res => res.json())
            .then(res =>
                this.setState({
                    userData: res
                })
            );
    }

    render() {
        return (
            <div class="page">
                <div class="page-header">
                    <div class="example example-well">
                        <div class="page-header text-center">
                            <h1 class="page-title">Manage Users</h1>
                        </div>
                    </div>
                </div>
                <div class="page-content">
                    <div class="panel">
                        <div class="panel-body">
                            <MUIDataTable
                                columns={this.tableForm}
                                data={this.state.userData}
                                options={{
                                    elevation: 0,
                                    selectableRows: "none",
                                    responsive: "scrollFullHeight"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
