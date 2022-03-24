import MaterialTable from "material-table";
import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import MainContainer from "../../components/MainContainer";
import UsersTable from "./components/table";
import UserForm from "./components/form";
import {getAllRoles, getUsers} from "../../api";
import "./style.css";
import { messageHandling } from "../../utils/messageHandling";

class Users extends Component {
    state = {
        isOpen: false,
        users: [
            {
                name: "SenelisVardas1",
                surname: "SenelisPavarde1"
            }
        ],
        roles: null,
    };

    componentDidMount = async () => {
        //const users = await getUsers();
       // const roles = await getAllRoles();
       // this.setState({ users: users.data, roles: roles.data });
    }

    toggleFormStatus = () => {
      //  const { isOpen } = this.state;
      //  this.setState({ isOpen: !isOpen });
    };

    onUsersChange = (user) => {
     //   const {users} = this.state;
     ////   this.setState({
     //       users: users.map(u => u.id === user.id ? user : u).concat(users.find(u => u.id === user.id) ? [] : [user]),
     //   });
    };

    render() {
        const { 
            isOpen,
            users, 
            roles,
        } = this.state;

        return (
            <div>
                <h2>Users</h2>
                <Button onClick={this.toggleFormStatus} className="right-button">
                    Add User
                </Button>
                <hr/>
                <UsersTable 
                    users={users}
                    roles={roles}
                    isLoading={users === null}
                    onUsersChange={this.onUsersChange}
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
        )

    }
}


export default Users;