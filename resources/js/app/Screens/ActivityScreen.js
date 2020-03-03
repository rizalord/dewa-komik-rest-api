import React from "react";
import MUIDataTable from "mui-datatables";
import Constant from "../systems/constants";
import swal from "sweetalert2";

export default class ActivityScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: []
        };

        this.tableForm = [
            {
                name: "name",
                label: "Name",
                sortable: true
            },
            {
                name: "message",
                label: "Message",
                sortable: true
            },
            {
                name: "created_at",
                label: "Date activity",
                sortable: true
            },
        ];

        this.deleteAdmin = this.deleteAdmin.bind(this);
        this.addAdminHandler = this.addAdminHandler.bind(this);
    }

    addAdminHandler() {
        swal.mixin({
            input: "text",
            confirmButtonText: "Next &rarr;",
            showCancelButton: true,
            progressSteps: ["1", "2", "3"],
            preConfirm: value => {
                if (value.trim() != "") {
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
                    swal.fire("Done!", "New Admin has been added.", "success");
                }
            });
    }

    async funcAddAdmin(admins) {
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
                    this._getAllUser();
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
        document.title = "Activities | Dewa Komik";
        this._getAllActivity();
    }

    async _getAllActivity() {
        await this.setState({
            userData: []
        });
        await fetch(Constant.apiUrl + "get/activity")
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
                    <h1 class="page-title">Activities</h1>
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
