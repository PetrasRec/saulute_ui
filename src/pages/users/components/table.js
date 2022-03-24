import { React, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import MaterialTable from 'material-table'
import UserForm from "./form";

const UsersTable = ({ users, roles, isLoading, onUsersChange }) => {

    const [isOpen, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const toggleFormStatus = () => {
        setOpen(!isOpen);
    };


    const onEditClick = (user) => {
        setSelectedUser(user);
        toggleFormStatus();
    };

    const actions = (user) => (
        <>    
            <Button
                type="button"
                key="editButton"
                className="secondary"
                onClick={() => onEditClick(user)}
            >
                Edit
            </Button>
        </>        
    );

    return (
        <>
            <MaterialTable
                className="material-table"
                columns={[
                    { title: "Name", field: "name" },
                    { title: "Surname", field: "surname" },
                    { title: "", field: "action", cellStyle: { textAlign: "right" }}
                ]}
                isLoading={isLoading}
                data={users ? users.map(u => ({
                    ...u, 
                    action: actions(u),
                    role_name: roles?.find(r => r.id === u.roleId)?.name ?? "No Role",
                })) : []}         
            />
            <Modal show={isOpen} onHide={toggleFormStatus}>
                <Modal.Header closeButton>
                    <Modal.Title>{users ? "Edit user" : "Add user" }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm 
                        userData={selectedUser}
                        onUsersChange={onUsersChange}
                        toggleModal={toggleFormStatus}
                        roles={roles}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UsersTable;