import { React, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserForm from "./form";
import { deleteBeacon } from "../../../api";

const BeaconsTable = ({ beacons, roles, isLoading, onBeaconsChange, refreshBeacons }) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedBeacon, setSelectedBeacon] = useState(null);

    const toggleFormStatus = () => {
        setOpen(!isOpen);
    };

    const onEditClick = (beacon) => {
        setSelectedBeacon(beacon);
        toggleFormStatus();
    };

    const onDelete = async (beacon) => {
        await deleteBeacon(beacon.id);
        refreshBeacons();
    };
    const actions = (beacon) => (
        <>
            <Button
                type="button"
                key="editButton"
                className="secondary"
                onClick={() => onEditClick(beacon)}
            >
                Edit
            </Button>
            <Button
                type="button"
                key="editButton"
                className="danger"
                onClick={() => onDelete(beacon)}
            >
                Delete
            </Button>
        </>
    );

    return (
        <>
            {/* <MaterialTable
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
            /> */}
            <Modal show={isOpen} onHide={toggleFormStatus}>
                <Modal.Header closeButton>
                    <Modal.Title>{beacons ? "Edit beacon" : "Add beacon"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm
                        userData={selectedBeacon}
                        onUsersChange={onBeaconsChange}
                        toggleModal={toggleFormStatus}
                        roles={roles}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default BeaconsTable;
