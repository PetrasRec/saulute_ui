import { React, useEffect, useState } from "react";
import axios from "../../axiosConfig";
import Banner from "../home/components/banner";
import "../home/components/banner/styles.scss";
import { getSupervisedUserById, getUserBeacons } from "../../api";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { SimpleGrid, Flex, HStack, VStack, Image, Text, Badge, Icon, Spacer, Button } from '@chakra-ui/react'
import RoomForm from "./components/form";
import { Modal } from "react-bootstrap";

const Rooms = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const [userBeacons, setUserBeacons] = useState(null);

  const [rooms, setRooms] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const fetchData = async () => {
    const data = await getSupervisedUserById(params.id);
    const beacons = await getUserBeacons(localStorage.getItem("user_id"));
    setUserBeacons(beacons.data);
    setSelectedUser(data.data);
  }
  useEffect(() => {
    fetchData()
  }, []);

  const toggleFormStatus = () => {
    setIsOpen(!isOpen);
  };

  if (!selectedUser) {
    return null;
  }


  const onRoomsChnage = (room) => {
    toggleFormStatus();
    if (!room.id) {
      room.id = rooms.reduce((prev, curr) => prev.id > curr ? prev.id : curr, 0)
      let room_idx = 0;
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id > room_idx) {
          room_idx = rooms[i].id;
        }
      }
      room.id = room_idx + 1;
      if (room.id === 2) {
        room.inside_room = true;
      }
      console.log(room);
      setRooms([...rooms, room]);
    } else {
      let room_idx = rooms.findIndex(r => r.id === room.id)
      rooms[room_idx] = room;

      setRooms(rooms);
    }
  }
  return (
    <>
      <div className="room_page">
        <h1>Stebimo asmens: <strong>{selectedUser.name} {selectedUser.surname} </strong>profilis</h1>
        <br />
        <Button _hover={{ bg: "#5f9ea0" }} bg='#43b3ae' color='white' onClick={toggleFormStatus}>
          Pridėti kambarį
        </Button>
        <br /> <br />
        <div id="rooms" >
          <SimpleGrid columns={[1, 2, 3]} spacing={5}>
            {rooms?.map(x => {
              return (
                <Flex borderRadius="8px" border="1px solid black" bg='inherit' minW='120px' minHeight='240px'>
                  <HStack>
                    <VStack alignItems="flex-start" p={2}>
                      <Image borderRadius="md" src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1092&q=80" />
                      <Text mt={2} fontSize="xl" fontWeight="semibold" >{x.name}</Text>
                      <Badge colorScheme={x.inside_room ? "green" : "red"}>{x.inside_room ? "Inside" : "Outside"}</Badge>
                    </VStack >
                    <VStack h="100%" p={2}>
                      <Flex h="100%" />
                      <Flex flexDir="column" >
                        <Button mt={2} color="white" style={{ background: "green" }}>Redaguoti</Button>
                        <Button mt={2} onClick={() => this.onDelete(x)} width="100%" color="white" style={{ background: "red" }}>Ištrinti</Button>
                      </Flex>
                    </VStack>
                  </HStack>
                </Flex>
              )
            })}
          </SimpleGrid>
        </div>
      </div>
      <Modal show={isOpen} onHide={toggleFormStatus}>
        <Modal.Header closeButton>
          <Modal.Title> Pridėti naują kambarį </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoomForm
            onRoomsChange={onRoomsChnage}
            userBeacons={userBeacons}
            toggleModal={toggleFormStatus}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Rooms;