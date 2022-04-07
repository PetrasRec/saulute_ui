import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import MainContainer from "../../components/MainContainer";
import UsersTable from "./components/table";
import UserForm from "./components/form";
import { getSupervisedUsers } from "../../api";
import "./style.css";
import { messageHandling } from "../../utils/messageHandling";
import { SimpleGrid, Flex, HStack, VStack, Image, Text, Badge, Icon, Spacer, Button } from '@chakra-ui/react'
import { HiOutlineDocumentReport } from 'react-icons/hi';

class Users extends Component {
  state = {
    isOpen: false,
    users: null,
    diedukai: []
  };

  // refreshUsers = async () => {
  //     const users = await getSupervisedUsers(localStorage.getItem("user_id"));
  //     this.setState({ users: users.data });
  // };

  componentDidMount = () => {
    // this.refreshUsers();
  };

  toggleFormStatus = () => {
    // const { isOpen } = this.state;
    // this.setState({ isOpen: !isOpen });
    let xd = this.state.diedukai
    xd.push(1)
    this.setState({ diedukai: xd })
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

    return (
      <div>
        <h2>Prižiūrimieji</h2>
        <Button onClick={this.toggleFormStatus} >
          Add User
        </Button>

        <hr />
        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          {this.state.diedukai.map(x => {
            return (
              <Flex borderRadius="8px" border="1px solid black" bg='inherit' minW='120px' minHeight='240px'>
                <HStack>
                  <VStack alignItems="flex-start" p={2}>
                    <Image borderRadius="md" src="https://previews.123rf.com/images/dtiberio/dtiberio1801/dtiberio180102518/94247018-confused-old-person.jpg" />
                    <Text mt={2} fontSize="xl" fontWeight="semibold" >Aleksandras</Text>
                    <Text mt={2} fontSize="xl" fontWeight="semibold" >Alenksandravičius</Text>
                    <Badge colorScheme="green">Active</Badge>
                  </VStack >
                  <VStack h="100%" p={2}>
                    <Flex border="1px solid black">
                      <Icon w={6} h={6} as={HiOutlineDocumentReport} />
                      <Text fontWeight={500}>Ataskaita</Text>
                    </Flex>
                    <Flex h="100%" />
                    <Flex flexDir="column" >
                      <Button width="100%" color="white" style={{ background: "red" }}>Ištrinti</Button>
                      <Button mt={2} color="white" style={{ background: "green" }}>Redaguoti</Button>
                    </Flex>
                  </VStack>
                </HStack>
              </Flex>
            )
          })}

          {/* <Flex bg='tomato' minW='120px' minHeight='240px'></Flex>
          <Flex bg='tomato' minW='120px' minHeight='240px'></Flex>
          <Flex bg='tomato' minW='120px' minHeight='240px'></Flex>
          <Flex bg='tomato' minW='120px' minHeight='240px'></Flex> */}
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
