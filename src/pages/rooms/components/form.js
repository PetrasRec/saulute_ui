import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createSupervisedUsers, updateSupervisedUsers, getRssiBeaconRooms } from "../../../api";
import { messageHandling } from '../../../utils/messageHandling';

const RoomForm = ({ roomData, onRoomsChange, userBeacons }) => {
    const [room, setRoom] = useState(roomData ? roomData : {
        id: null,
        name: "",
        stack_id: null,
        inside_room: false,
    });

    const [beaconId, setbeaconId] = useState(null);

    const [roomExternal, setRoomExternal] = useState(null);

    const onChange = (event) => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let result = null;
        result = await createSupervisedUsers(roomData.id, room);
        onRoomsChange(room)
    };

    const onChangeBeacon = async (event) => {
        const beaconId = event.target.value;
        const rooms = await getRssiBeaconRooms(beaconId);
        setRoomExternal(rooms.data)
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
                <Form.Label class="names">Svyturys</Form.Label>
                <select value={beaconId} onChange={onChangeBeacon}>
                    <option value={null}>
                        Select beacon id
                    </option>
                    {
                        userBeacons.map(u => (
                            <option value={u.beaconId}>
                                {u.beaconId}
                            </option>
                        ))
                    }
                </select>
            </Form.Group>
            <Form.Group>
                <Form.Label class="names">Kambariai</Form.Label>
                <select value={beaconId} onChange={() => { }}>
                    <option value={null}>
                        Pasirinkti kambari
                    </option>
                    {
                        roomExternal?.map(u => (
                            <option value={u.corner1}>
                                {u.id} {u.corner1} {u.corner2} {u.corner3} {u.corner4}
                            </option>
                        ))
                    }
                </select>
            </Form.Group>
            <Button variant="primary" type="submit" >
                {roomData ? "Atnaujinti" : "Pridėti"}
            </Button>
        </Form>
    )
}

export default RoomForm;