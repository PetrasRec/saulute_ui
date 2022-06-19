import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import UserForm from "./components/form";
import { getSupervisedUsers, deleteSupervisedUsers } from "../../api";
import "./style.css";
import { messageHandling } from "../../utils/messageHandling";
import { SimpleGrid, Flex, HStack, VStack, Image, Text, Badge, Icon, Spacer, Button } from '@chakra-ui/react'
import { Link } from "react-router-dom";

class Users extends Component {
  state = {
    isOpen: false,
    users: null,
    helpStamps: null,
    selectedUser: null,
  };

  refreshUsers = async () => {
    const users = await getSupervisedUsers(localStorage.getItem("user_id"));
    this.setState({ users: users.data.supervisedUsers, helpStamps: users.data.helpStamps });
  };

  onDelete = async (user) => {
    await deleteSupervisedUsers(user.id);
    this.refreshUsers();
    messageHandling("success", "Sėkmingai ištrintas prižiūrimasis");
  };


  componentDidMount = () => {
    this.refreshUsers();

    setInterval(this.refreshUsers, 4000);
  };

  toggleFormStatus = (user) => {
    const { isOpen } = this.state;
    this.setState({ selectedUser: user, isOpen: !isOpen });
  };

  onUsersChange = (user) => {
    const { users } = this.state;
    this.setState({
      users: users
        .map((u) => (u.id === user.id ? user : u))
        .concat(users.find((u) => u.id === user.id) ? [] : [user]),
    });
  };

  getCalled = (user) => {
    if (!this.state.helpStamps) {
      return [];
    }

    return this.state.helpStamps.filter(hs => hs.supervisedUserId == user.id);
  };

  hasCalled = (user) => this.getCalled(user).length > 0;

  render() {
    const { isOpen, users, roles } = this.state;
    const headerStyle = {
      textAlign: "center",
      fontSize: "30px",
      fontFamily: "Arial"
    };
    return (
      <div>
        <h2 style={headerStyle}>Prižiūrimieji</h2>
        <Button _hover={{ bg: "#009999" }} bg='#43b3ae' color='white' onClick={() => this.toggleFormStatus(null)} my={2} >
          Add User
        </Button>

        <hr />
        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          {this.state.users?.map(x => {
            return (
              <Flex borderRadius="8px" border="1px solid black" bg='inherit' minW='120px' minHeight='240px' backgroundColor={this.hasCalled(x) ? "red" : ""} mt={2} >
                <HStack>
                  <VStack alignItems="flex-start" p={2} my={2}>
                    <Image borderRadius="md" src="/img/oldperson.jpg" />
                    <Text mt={2} fontSize="xl" fontWeight="semibold" >{x.name}</Text>
                    <Text mt={2} fontSize="xl" fontWeight="semibold" >{x.surname}</Text>
                    {this.hasCalled(x) && <Text mt={2} fontSize="xl" fontWeight="semibold" >Iškvietė pagalbą: {this.getCalled(x).length}</Text>}
                    <Badge colorScheme="green">Active</Badge>
                  </VStack >
                  <VStack h="100%" p={2}>
                    <Flex h="100%" />
                    <Flex flexDir="column" >
                      <Link to={`/${x.id}/rooms`}>
                        <Button mt={2} color="white" _hover={{ bg: "#4c0099" }} bg='#6600cc'>Priežiūra</Button>
                      </Link>
                      <Button mt={2} _hover={{ bg: "#006633" }} bg='#00994c' color='white' onClick={() => this.toggleFormStatus(x)}>Redaguoti</Button>
                      <Button mt={2} _hover={{ bg: "#A62121" }} bg='#D82828' color='white' onClick={() => this.onDelete(x)}>Ištrinti</Button>
                    </Flex>
                  </VStack>
                </HStack>
              </Flex>
            )
          })}

        </SimpleGrid>
        <Modal show={isOpen} onHide={() => this.toggleFormStatus(null)}>
          <Modal.Header closeButton>
            <Modal.Title> {this.state.selectedUser ? "Atnaujinti prižiūrimojo duomenis" : "Pridėti prižiūrimą asmenį"} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserForm
              onUsersChange={this.onUsersChange}
              toggleModal={this.toggleFormStatus}
              roles={roles}
              selectedUser={this.state.selectedUser}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Users;
