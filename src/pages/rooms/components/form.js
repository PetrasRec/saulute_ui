import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createSupervisedUsers, updateSupervisedUsers } from "../../../api";
import { messageHandling } from '../../../utils/messageHandling';

const RoomForm = ({ roomData, onRoomsChange }) => {
    const [room, setRoom] = useState(roomData ? roomData : {
        id: null,
        name: "",
        stack_id: null,
        inside_room: false,
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setRoom({...room, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        onRoomsChange(room)
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label class="names">Kambario pavadinimas</Form.Label>
                <Form.Control
                    name="name"
                    onChange={onChange}
                    value={room.name}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label class="names">Švyturio identifikacijos numeris</Form.Label>
                <Form.Control
                    name="stack_id"
                    onChange={onChange}
                    value={room.stack_id}
                    required
                />
            </Form.Group>
        <Button variant="primary" type="submit" >
            {roomData ? "Atnaujinti" : "Pridėti" }
        </Button>
    </Form>
    )
}

export default RoomForm;