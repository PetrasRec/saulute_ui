import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addUserBeacon } from "../../../api";
import { messageHandling } from '../../../utils/messageHandling';

const BeaconForm = ({ beaconData, onBeaconsChange, toggleModal, users, beaconIds }) => {
    console.log("iddds: ", beaconIds)
    const [userId, setUserId] = useState(null);
    const [beaconId, setBeaconId] = useState(null);

    const onChangeUser = (event) => {
        setUserId(event.target.value)
    };

    const onChangeBeacon = (event) => {
        setBeaconId(event.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        addUserBeacon(userId, { beaconId: beaconId })
        toggleModal();
        onBeaconsChange();
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label class="name">Naudotojas</Form.Label>
                <select value={userId} onChange={onChangeUser}>
                    {
                        users.map(u => (
                            <option value={u.id}>
                                {u.name} {u.surname}
                            </option>
                        ))
                    }
                </select>
                <br />
                <Form.Label class="name">Svyturys</Form.Label>
                <select value={beaconId} onChange={onChangeBeacon}>
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
                {beaconData ? "Update" : "Add"}
            </Button>
        </Form>
    )
}

export default BeaconForm;