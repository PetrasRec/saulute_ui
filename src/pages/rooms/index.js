import { React, useEffect, useState } from "react";
import axios from "../../axiosConfig";
import Banner from "../home/components/banner";
import "../home/components/banner/styles.scss";
import { getSupervisedUserById, getUserBeacons, getUserRooms,  deleteUserRoomsById, getUserRoomsLiveData} from "../../api";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { SimpleGrid, Flex, HStack, VStack, Image, Text, Badge, Icon, Spacer, Button } from '@chakra-ui/react'
import RoomForm from "./components/form";
import { Modal } from "react-bootstrap";

const Rooms = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const [userBeacons, setUserBeacons] = useState(null);

  const [userRooms, setUserRoom] = useState([]);

  const [liveData, setLiveData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const fetchData = async () => {
    const data = await getSupervisedUserById(params.id);
    const beacons = await getUserBeacons(localStorage.getItem("user_id"));
    const userRooms = await getUserRooms(localStorage.getItem("user_id"));
    setUserBeacons(beacons.data);
    setSelectedUser(data.data);
    setUserRoom(userRooms.data);
  }
  
  useEffect(() => {
    fetchData()
    setInterval(getLiveData, 4000);
  }, []);

  const getLiveData = async () => {
    const liveRoomData = await getUserRoomsLiveData(localStorage.getItem("user_id"));  
    for (let i = 0; i < liveRoomData.data.length; i++) {
      const liveRoom = liveRoomData.data[i];
      const idx = userRooms.findIndex(ur => ur.id == liveRoom.userRoom.id);

      if (idx === -1) {
        continue;
      }
      userRooms[idx] = {...userRooms[idx], insideRoom: liveRoom.insideRoom, distance: liveRoom.distance};
      
    } 
    setLiveData(liveRoomData.data);
  }
  const toggleFormStatus = () => {
    setIsOpen(!isOpen);
  };

  if (!selectedUser) {
    return null;
  }


  const onRoomsChnage = (room) => {
    toggleFormStatus();
    fetchData();
  };

  const onDelete = async (id) => {
    await deleteUserRoomsById(id);
    fetchData();
  };

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
            {userRooms?.map(x => {
              return (
                <Flex borderRadius="8px" border="1px solid black" bg='inherit' minW='120px' minHeight='240px'>
                  <HStack>
                    <VStack alignItems="flex-start" p={2}>
                      <Image borderRadius="md" src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1092&q=80" />
                      <Text mt={2} fontSize="xl" fontWeight="semibold" >{x.name}</Text>
                      <Badge colorScheme={(liveData?.find(r => x.id == r.userRoom.id)?.isInside ?? false) ? "green" : "red"}>{(liveData?.find(r => x.id == r.userRoom.id)?.isInside ?? false) ? "Inside" : "Outside"}</Badge>
                      <Badge colorScheme="white">Atstumas: {liveData?.find(r => x.id == r.userRoom.id)?.distance ?? "Krauna"}</Badge>
                    </VStack >
                    <VStack h="100%" p={2}>
                      <Flex h="100%" />
                      <Flex flexDir="column" >
                        <Button mt={2} color="white" style={{ background: "green" }}>Redaguoti</Button>
                        <Button mt={2} onClick={() => onDelete(x.id)} width="100%" color="white" style={{ background: "red" }}>Ištrinti</Button>
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