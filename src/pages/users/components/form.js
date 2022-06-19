import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createSupervisedUsers, updateSupervisedUsers } from "../../../api";
import { messageHandling } from '../../../utils/messageHandling';

const UserForm = ({ selectedUser, onUsersChange, toggleModal }) => {
    console.log(selectedUser);
    const [user, setUser] = useState(selectedUser ? selectedUser : {
        userName: "",
        name: "",
        surname: "",
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setUser({...user, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let result = null;
        if (selectedUser) {
            result = await updateSupervisedUsers(selectedUser.id, user);
            messageHandling("success", "Sėkmingai atnaujintas prižiūrimasis");
        } else {
            result = await createSupervisedUsers(localStorage.getItem("user_id"), user);
            messageHandling("success", "Sėkmingai pridėtas prižiūrimasis");
        }
        toggleModal(null);
        onUsersChange(result.data);
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label class="names">Vardas</Form.Label>
                <Form.Control
                    name="name"
                    onChange={onChange}
                    value={user.name}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label class="names">Pavardė</Form.Label>
                <Form.Control
                    name="surname"
                    onChange={onChange}
                    value={user.surname}
                    required
                />
            </Form.Group>
        <Button variant="primary" type="submit" >
            {selectedUser ? "Atnaujinti" : "Pridėti" }
        </Button>
    </Form>
    )
}

export default UserForm;