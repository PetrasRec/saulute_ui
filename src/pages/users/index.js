import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import MainContainer from "../../components/MainContainer";
import UsersTable from "./components/table";
import UserForm from "./components/form";
import { getSupervisedUsers } from "../../api";
import "./style.css";
import { messageHandling } from "../../utils/messageHandling";

class Users extends Component {
    state = {
        isOpen: false,
        users: null,
    };

    refreshUsers = async () => {
        const users = await getSupervisedUsers(localStorage.getItem("user_id"));
        this.setState({ users: users.data });
    };

    componentDidMount = () => {
        this.refreshUsers();
    };

    toggleFormStatus = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    };

    onUsersChange = (user) => {
        const { users } = this.state;
        this.setState({
            users: users
                .map((u) => (u.id === user.id ? user : u))
                .concat(users.find((u) => u.id === user.id) ? [] : [user]),
        });
    };

    render() {
        const { isOpen, users, roles } = this.state;

        return (
            <div>
                <h2>Prižiūrimieji</h2>
                <Button onClick={this.toggleFormStatus} className="btn">
                    Add User
                </Button>

                <hr />
                <UsersTable
                    users={users}
                    roles={roles}
                    isLoading={users === null}
                    onUsersChange={this.onUsersChange}
                    refreshUsers={this.refreshUsers}
                />

                <Modal show={isOpen} onHide={this.toggleFormStatus}>
                    <Modal.Header closeButton>
                        <Modal.Title> Add New User </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UserForm
                            onUsersChange={this.onUsersChange}
                            toggleModal={this.toggleFormStatus}
                            roles={roles}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Users;
