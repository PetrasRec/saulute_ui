import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createSupervisedUsers, addUserRoom, getRssiBeaconRooms, updateUserRoom } from "../../../api";
import { messageHandling } from '../../../utils/messageHandling';

const RoomForm = ({ roomData, onRoomsChange, userBeacons, supervisedUserId }) => {
    const [room, setRoom] = useState(roomData ? roomData : {
        name: "",
        beaconId: null,
        roomId: null,
    });

    const [roomExternal, setRoomExternal] = useState(null);

    const onChange = (event) => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (roomData) {
            await updateUserRoom(roomData.id, room);
            await onRoomsChange();
            messageHandling("success", "Sėkmingai atnaujintas kambarys");
            return;
        }

        const r = roomExternal.find(re => re.id == room.roomId);
        room.corner1 = r.corner1;
        room.corner2 = r.corner2;
        room.corner3 = r.corner3;
        room.corner4 = r.corner4;
        await addUserRoom(localStorage.getItem("user_id"), supervisedUserId, room);
        messageHandling("success", "Sėkmingai pridėtas kambarys");
        await onRoomsChange();
    };

    const onChangeBeacon = async (event) => {
        const beaconId = event.target.value;
        const rooms = await getRssiBeaconRooms(beaconId);
        setRoomExternal(rooms.data);
        setRoom({ ...room, beaconId: parseInt(beaconId) });
    };

    const onChangeRoom = async (event) => {
        const roomId = event.target.value;
        setRoom({ ...room, roomId: parseInt(roomId) });
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
            {!roomData &&
                (
                    <>
                        <Form.Group>
                            <Form.Label class="names">Švyturys</Form.Label>
                            <select value={room.beaconId} onChange={onChangeBeacon}>
                                <option value={null}>
                                    Pasirinkti švyturį
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
                            <select value={room.roomId} onChange={onChangeRoom}>
                                <option value={null}>
                                    Pasirinkti kambari
                                </option>
                                {
                                    roomExternal?.map(u => (
                                        <option value={u.id}>
                                            {u.id} {u.corner1} {u.corner2} {u.corner3} {u.corner4}
                                        </option>
                                    ))
                                }
                            </select>
                        </Form.Group>
                    </>
                )
            }
            <Button variant="primary" type="submit" >
                {roomData ? "Atnaujinti" : "Pridėti"}
            </Button>
        </Form>
    )
}

export default RoomForm;