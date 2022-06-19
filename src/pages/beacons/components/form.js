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

        if (userBeacons.find(x => (!selectedUserBeacon || selectedUserBeacon.id !== x.id) && x.user.id == userId && x.beaconId == beaconId)) {
            messageHandling("error", "Toks švyturys jau pridėtas");
            return;
        }

        if (!selectedUserBeacon) {
            await addUserBeacon(userId, { beaconId: beaconId });
            messageHandling("success", "Sėkmingai pridėtas švyturys");
        } else { 
            await editBeacon(selectedUserBeacon.id, { beaconId: beaconId, user: {id: userId } });
            messageHandling("success", "Sėkmingai atnaujintas švyturys");
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
                {selectedUserBeacon ? "Atnaujinti" : "Pridėti"}
            </Button>
        </Form>
    )
}

export default BeaconForm;