import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { editUser } from "../../../api";
import { messageHandling } from '../../../utils/messageHandling';

const UserForm = ({ userData, onUsersChange, toggleModal, roles }) => {

    const [user, setUser] = useState(userData ? userData : {
        userName: "",
        name: "",
        surname: "",
        email: "",
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let result = null;
        if (userData) {
            result = await editUser(userData.id, user);
            messageHandling("success", "Successfuly updated user");
        }
        toggleModal();
        onUsersChange(result.data);
    };

    return (
        <Form onSubmit={onSubmit}>

            <Form.Group>
                <Form.Label class="names">Name</Form.Label>
                <Form.Control
                    name="name"
                    onChange={onChange}
                    value={user.name}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label class="names">Surname</Form.Label>
                <Form.Control
                    name="surname"
                    onChange={onChange}
                    value={user.surname}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label class="names">User name</Form.Label>
                <Form.Control
                    name="user name"
                    onChange={onChange}
                    value={user.userName}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" >
                {userData ? "Update" : "Add"}
            </Button>
        </Form>
    )
}

export default UserForm;