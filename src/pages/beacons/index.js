import React, { Component } from "react";
import { Modal, NavLink } from "react-bootstrap";
import MainContainer from "../../components/MainContainer";
import BeaconForm from "./components/form";
import { getRssiBeacons, deleteUserBeacon, editBeacon, getUsers, getUserBeacons, getBeacons } from "../../api";
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
    selectedUserBeacon: null,
  };

  refreshBeacons = async () => {
    const beacons = await getRssiBeacons();
    const users = await getUsers();
    //const userbeacons = await getUserBeacons(localStorage.getItem("user_id"), beacons.data)
    const userbeacons = await getBeacons();
    console.log("zodis", userbeacons.data);
    this.setState({ beacons: beacons.data, users: users.data, userbeacons: userbeacons.data });
  };

  onDelete = async (userbeacons) => {
    await deleteUserBeacon(userbeacons.id);
    this.refreshBeacons();
  };

  componentDidMount = () => {
    this.refreshBeacons();
  };

  toggleFormStatus = (userBeacon) => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen, selectedUserBeacon: !isOpen === false ? null : userBeacon });
  };

  onBeaconsChange = () => {
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
                  <Th>Vartotojas</Th>
                  <Th>Švyturio ID numeris</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {this.state.userbeacons?.map(x => {
                  return (
                    <Tr>
                      <Td>{x.user.name} {x.user.surname}</Td>
                      <Td>{x.beaconId}</Td>
                      <Td>
                        <Button mt={2} _hover={{ bg: "#006633" }} bg='#00994c' color='white' onClick={() => this.toggleFormStatus(x)}>Redaguoti</Button>
                        <Button mt={2} _hover={{ bg: "#A62121" }} bg='#D82828' color='white' onClick={() => this.onDelete(x)}>Ištrinti</Button>
                      </Td>
                    </Tr>

                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>

        </SimpleGrid>

        <Modal show={isOpen} onHide={this.toggleFormStatus}>
          <Modal.Header closeButton>
            <Modal.Title> {this.state.selectedUserBeacon ? "Edit beacon" : "Add New Beacon"} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BeaconForm
              onBeaconsChange={this.onBeaconsChange}
              toggleModal={this.toggleFormStatus}
              beaconIds={this.state.beacons}
              users={this.state.users}
              userBeacons={this.state.userbeacons}
              selectedUserBeacon={this.state.selectedUserBeacon}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Beacons;
