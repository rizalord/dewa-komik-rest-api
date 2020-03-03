import React from "react";
import MUIDataTable from "mui-datatables";
import Constant from "../systems/constants";
import swal from "sweetalert2";

export default class AdminScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: []
        };

        this.tableForm = [
            {
                name: "id",
                label: "id",
                options: {
                    display: "excluded"
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
                label: "Date Created",
                sortable: true
            },
            {
                name: "id",
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
                                class={`btn d-block w-100 my-1 btn-danger`}
                                onClick={e => {
                                    this.deleteAdmin(value);
                                }}
                            >
                                Delete
                            </button>
                        );
                    }
                }
            }
        ];

        this.deleteAdmin = this.deleteAdmin.bind(this);
        this.addAdminHandler = this.addAdminHandler.bind(this);
    }

    addAdminHandler(){
        swal.mixin({
            input: "text",
            confirmButtonText: "Next &rarr;",
            showCancelButton: true,
            progressSteps: ["1", "2", "3"],
            preConfirm : (value) => {
                if (value.trim() != '') {
                    // Handle return value
                    return value;
                } else {
                    swal.showValidationMessage("Input field cannot be blank!");
                }
            }
        })
            .queue([
                {
                    title: "Full Name",
                    text: "Please provide name for new Admin"
                },
                "Email",
                "Password"
            ])
            .then(result => {
                if (result.value) {
                    const answers = result.value;
                    this.funcAddAdmin(answers);
                    
                }
            });
    }

    async funcAddAdmin(admins){
        await fetch(Constant.apiUrl + "add/new/admin", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: admins[0],
                email: admins[1],
                password: admins[2]
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status == true) {
                    swal.fire("Done!", "New Admin has been added.", "success");
                    this._getAllUser();
                }else{
                    swal.fire({
                        icon: "error",
                        type: "error",
                        title: "Fail to add Admin",
                        text: "Admin with the same email already exist!"
                    });
                }
            });
    }

    async deleteAdmin(id) {
        swal.fire({
            title: "Are you sure to delete this Account?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete this snake!"
        }).then(async result => {
            if (result.value) {
                await fetch(Constant.apiUrl + `admin/delete`, {
                    method: "DELETE",
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status == true) {
                            swal.fire(
                                "Deleted!",
                                "Snake has been deleted.",
                                "success"
                            );
                            this._getAllUser();
                        }
                    })
                    .catch(err => console.log(err));
            }
        });
    }

    componentDidMount() {
        this._getAllUser();
        document.title = "Manage Admins | Dewa Komik";
    }

    async _getAllUser() {
        await this.setState({
            userData: []
        });
        await fetch(Constant.apiUrl + "get/admin/multiple/data")
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    this.setState({
                        userData: res.data
                    });
                }
            });
    }

    render() {
        return (
            <div class="page">
                <div class="page-header">
                    <div class="example example-well">
                        <div class="page-header text-center">
                            <h1 class="page-title">Manage Admins</h1>
                        </div>
                    </div>
                </div>
                <div class="page-content">
                    <div class="panel">
                        <div class="panel-body">
                            <div style={{
                                display : 'flex',
                                justifyContent : 'flex-end'
                            }}>
                                <button
                                    className="btn btn-primary"
                                    style={{ marginLeft: "auto" }}
                                    onClick={() => {
                                        this.addAdminHandler();
                                    }}
                                >
                                    Add Admin
                                </button>
                            </div>
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
