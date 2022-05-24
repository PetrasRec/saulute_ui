import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addUserBeacon, editBeacon } from "../../../api";
import { messageHandling } from '../../../utils/messageHandling';

const BeaconForm = ({ onBeaconsChange, toggleModal, users, beaconIds, userBeacons, selectedUserBeacon }) => {
    const [userId, setUserId] = useState(selectedUserBeacon?.user?.id ?? null);
    const [beaconId, setBeaconId] = useState(selectedUserBeacon?.beaconId ?? null);

    const onChangeUser = (event) => {
        setUserId(event.target.value)
    };

    const onChangeBeacon = (event) => {
        setBeaconId(event.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(userBeacons, userId, beaconId, userBeacons.find(x => x.user.id == userId && x.beaconId == beaconId))
        if (userBeacons.find(x => x.user.id == userId && x.beaconId == beaconId)) {
            return;
        }
        if (!selectedUserBeacon) {
            await addUserBeacon(userId, { beaconId: beaconId })
        } else { 
            await editBeacon(selectedUserBeacon.id, { beaconId: beaconId, user: {id: userId } });
        }

        onBeaconsChange();
        toggleModal();   
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label class="name">Naudotojas</Form.Label>
                <select value={userId} onChange={onChangeUser}>
                    <option value={null}>
                        Pasirinkti naudotoja
                    </option>
                    {
                        users.map(u => (
                            <option value={u.id}>
                                {u.name} {u.surname}
                            </option>
                        ))
                    }
                </select>
            </Form.Group>
                <br />
            <Form.Group>
                <Form.Label class="name">Svyturys</Form.Label>
                <select value={beaconId} onChange={onChangeBeacon}>
                    <option value={null}>
                        Pasirinkti id
                    </option>
                    {
                        beaconIds.map(u => (
                            <option value={u}>
                                {u}
                            </option>
                        ))
                    }
                </select>
            </Form.Group>
            <Button variant="primary" type="submit" >
                {selectedUserBeacon ? "Update" : "Add"}
            </Button>
        </Form>
    )
}

export default BeaconForm;


/*
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
*/