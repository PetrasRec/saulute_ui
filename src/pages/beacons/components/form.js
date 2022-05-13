import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addBeacon, editBeacon } from "../../../api";
import { messageHandling } from '../../../utils/messageHandling';

const BeaconForm = ({ beaconData, onBeaconsChange, toggleModal, roles }) => {

    const [beacon, setBeacon] = useState(beaconData ? beaconData : {
        identification: "",
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setBeacon({ ...beacon, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let result = null;
        if (beaconData) {
            result = await editBeacon(beaconData.id, beacon);
            messageHandling("success", "Successfuly updated beacon");
        } else {
            result = await addBeacon(beacon);
            messageHandling("success", "Successfuly added new beacon");
        }
        toggleModal();
        onBeaconsChange(result.data);
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label class="name">Švyturio identifikacija</Form.Label>
                <Form.Control
                    name="identification"
                    onChange={onChange}
                    value={beacon.identification}
                />
            </Form.Group>
            <Button variant="primary" type="submit" >
                {beaconData ? "Update" : "Add"}
            </Button>
        </Form>
    )
}

export default BeaconForm;