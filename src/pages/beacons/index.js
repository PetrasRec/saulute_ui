import React, { Component } from "react";
import { Modal, NavLink } from "react-bootstrap";
import MainContainer from "../../components/MainContainer";
import BeaconsTable from "./components/table";
import BeaconForm from "./components/form";
import { getRssiBeacons, deleteBeacon, editBeacon, getUsers, getUserBeacons } from "../../api";
import "./style.css";
import { messageHandling } from "../../utils/messageHandling";
import { SimpleGrid, Button } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react'
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { Link } from "react-router-dom";

class Beacons extends Component {
  state = {
    isOpen: false,
    isOpenEdit: false,
    beacons: null,
    users: null,
    userbeacons: null,
  };

  refreshBeacons = async () => {
    const beacons = await getRssiBeacons();
    const users = await getUsers();
    const userbeacons = await getUserBeacons(localStorage.getItem("user_id"), beacons.data)
    console.log("zodis", userbeacons.data);
    this.setState({ beacons: beacons.data, users: users.data, userbeacons: userbeacons.data });
  };

  onDelete = async (beacon) => {
    await deleteBeacon(beacon.id);
    this.refreshBeacons();
  };

  onEdit = async (beacon) => {
    await editBeacon(beacon.id, beacon.data);
    this.refreshBeacons();
  };

  componentDidMount = () => {
    this.refreshBeacons();
  };

  toggleFormStatus = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  toggleEditFormStatus = () => {
    const { isOpenEdit } = this.state;
    this.setState({ isOpenEdit: !isOpenEdit });
  };

  onBeaconsChange = (beacon) => {
    this.refreshBeacons();
  };

  render() {
    const { isOpen, beacons, roles, isOpenEdit } = this.state;
    const headerStyle = {
      textAlign: "center",
      fontSize: "30px",
      fontFamily: "Arial"
    };

    if (beacons == null) {
      return <p>nenuskaityti duomenys</p>
    }

    return (
      <div>
        <h2 style={headerStyle}>Švyturiai</h2>
        <Button _hover={{ bg: "#009999" }} bg='#43b3ae' color='white' onClick={this.toggleFormStatus} >
          Add Beacon
        </Button>

        <hr />
        <SimpleGrid columns={[1]} spacing={5}>
          <TableContainer>
            <Table size='sm' variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>Vartotojo vardas</Th>
                  <Th>Vartotojo pavardė</Th>
                  <Th>Švyturio ID numeris</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {this.state.userbeacons?.map(x => {
                  return (
                    <Tr>
                      <Td>{x.user.name}</Td>
                      <Td>{x.user.surname}</Td>
                      <Td>{x.beaconId}</Td>
                      <Td>
                        <Button mt={2} _hover={{ bg: "#006633" }} bg='#00994c' color='white' onClick={this.toggleEditFormStatus}>Redaguoti</Button>
                        <Button mt={2} _hover={{ bg: "#A62121" }} bg='#D82828' color='white' onClick={() => this.onDelete(x)}>Ištrinti</Button>
                      </Td>
                    </Tr>

                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>

        </SimpleGrid>



        <BeaconsTable
          beacons={beacons}
          roles={roles}
          isLoading={beacons === null}
          onBeaconsChange={this.onBeaconsChange}
          refreshBeacons={this.refreshBeacons}
        />

        <Modal show={isOpen} onHide={this.toggleFormStatus}>
          <Modal.Header closeButton>
            <Modal.Title> Add New Beacon </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BeaconForm
              onBeaconsChange={this.onBeaconsChange}
              toggleModal={this.toggleFormStatus}
              beaconIds={this.state.beacons}
              users={this.state.users}
            />
          </Modal.Body>
        </Modal>

        <Modal show={isOpenEdit} onHide={this.toggleEditFormStatus}>
          <Modal.Header closeButton>
            <Modal.Title> Edit Beacon </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BeaconForm
              onBeaconsChange={this.onBeaconsChange}
              toggleModal={this.toggleEditFormStatus}
              beaconIds={this.state.beacons}
              users={this.state.users}
            />
          </Modal.Body>
        </Modal>


      </div>
    );
  }
}

export default Beacons;
