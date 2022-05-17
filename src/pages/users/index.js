import React, { Component } from "react";
import { Modal, NavLink } from "react-bootstrap";
import MainContainer from "../../components/MainContainer";
import UsersTable from "./components/table";
import UserForm from "./components/form";
import { getSupervisedUsers, deleteSupervisedUsers } from "../../api";
import "./style.css";
import { messageHandling } from "../../utils/messageHandling";
import { SimpleGrid, Flex, HStack, VStack, Image, Text, Badge, Icon, Spacer, Button } from '@chakra-ui/react'
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { Link } from "react-router-dom";

class Users extends Component {
  state = {
    isOpen: false,
    users: null,
  };

  refreshUsers = async () => {
    const users = await getSupervisedUsers(localStorage.getItem("user_id"));
    this.setState({ users: users.data });
  };

  onDelete = async (user) => {
    await deleteSupervisedUsers(user.id);
    this.refreshUsers();
  };

  componentDidMount = () => {
    this.refreshUsers();
  };

  toggleFormStatus = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  onUsersChange = (user) => {
    const { users } = this.state;
    this.setState({
      users: users
        .map((u) => (u.id === user.id ? user : u))
        .concat(users.find((u) => u.id === user.id) ? [] : [user]),
    });
  };

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
        <Button _hover={{ bg: "#009999" }} bg='#43b3ae' color='white' onClick={this.toggleFormStatus} >
          Add User
        </Button>

        <hr />
        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          {this.state.users?.map(x => {
            return (
              <Flex borderRadius="8px" border="1px solid black" bg='inherit' minW='120px' minHeight='240px'>
                <HStack>
                  <VStack alignItems="flex-start" p={2}>
                    <Image borderRadius="md" src="https://previews.123rf.com/images/dtiberio/dtiberio1801/dtiberio180102518/94247018-confused-old-person.jpg" />
                    <Text mt={2} fontSize="xl" fontWeight="semibold" >{x.name}</Text>
                    <Text mt={2} fontSize="xl" fontWeight="semibold" >{x.surname}</Text>
                    <Badge colorScheme="green">Active</Badge>
                  </VStack >
                  <VStack h="100%" p={2}>
                    <Flex border="1px solid black">
                      <Icon w={6} h={6} as={HiOutlineDocumentReport} />
                      <Text fontWeight={500}>Ataskaita</Text>
                    </Flex>
                    <Flex h="100%" />
                    <Flex flexDir="column" >
                      <Link to={`/${x.id}/rooms`}>
                        <Button mt={2} color="white" _hover={{ bg: "#4c0099" }} bg='#6600cc'>Priežiūra</Button>
                      </Link>
                      <Button mt={2} _hover={{ bg: "#006633" }} bg='#00994c' color='white'>Redaguoti</Button>
                      <Button mt={2} _hover={{ bg: "#A62121" }} bg='#D82828' color='white' onClick={() => this.onDelete(x)}>Ištrinti</Button>
                    </Flex>
                  </VStack>
                </HStack>
              </Flex>
            )
          })}

        </SimpleGrid>
        <UsersTable
          users={users}
          roles={roles}
          isLoading={users === null}
          onUsersChange={this.onUsersChange}
          refreshUsers={this.refreshUsers}
        />

        <Modal show={isOpen} onHide={this.toggleFormStatus}>
          <Modal.Header closeButton>
            <Modal.Title> Add New User </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserForm
              onUsersChange={this.onUsersChange}
              toggleModal={this.toggleFormStatus}
              roles={roles}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Users;
