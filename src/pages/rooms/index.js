import { React, useEffect, useState } from "react";
import axios from "../../axiosConfig";
import Banner from "../home/components/banner";
import "../home/components/banner/styles.scss";
import { getSupervisedUserById, getUserBeacons, getUserRooms,  deleteUserRoomsById, getUserRoomsLiveData, getUserRoomsLiveHelpData} from "../../api";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { SimpleGrid, Flex, HStack, VStack, Image, Text, Badge, Icon, Spacer, Button } from '@chakra-ui/react'
import RoomForm from "./components/form";
import { Modal } from "react-bootstrap";
import { messageHandling } from "../../utils/messageHandling";

const Rooms = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const [userBeacons, setUserBeacons] = useState(null);

  const [userRooms, setUserRoom] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedEditRoom, setSelectedEditRoom] = useState(null);
  
  const [liveData, setLiveData] = useState([]);
  const [liveHelpData, setLiveHelpData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const fetchData = async () => {
    const data = await getSupervisedUserById(params.id);
    const beacons = await getUserBeacons(localStorage.getItem("user_id"));
    const userRooms = await getUserRooms(params.id);
    setUserBeacons(beacons.data);
    setSelectedUser(data.data);
    setUserRoom(userRooms.data);
  }
  
  useEffect(() => {
    fetchData()
    setInterval(getLiveData, 4000);
    setInterval(getLiveHelpData, 4000);
  }, []);

  const getLiveData = async () => {
    const liveRoomData = await getUserRoomsLiveData(params.id);  
    setLiveData(liveRoomData.data);
  };

  const getLiveHelpData = async () => {
    const liveRoomData = await getUserRoomsLiveHelpData(params.id);  
    setLiveHelpData(liveRoomData.data);
  };

  const toggleFormStatus = (selectedRoom) => {
    setIsOpen(!isOpen);
    setSelectedEditRoom(selectedRoom);
  };

  const toggleStatsStatus = (room) => {
    setSelectedRoom(room);
  };

  if (!selectedUser) {
    return null;
  }


  const onRoomsChnage = () => {
    toggleFormStatus(null);
    fetchData();
  };

  const onDelete = async (id) => {
    await deleteUserRoomsById(id);
    messageHandling("success", "Sėkmingai ištrintas kambarys");
    fetchData();
  };

  const getHelp = (userRoom) => {
    if (!liveHelpData || !userRoom) {
      return [];
    }
    return liveHelpData.filter(h => h.userRoom && h.userRoom.id == userRoom.id);
  }

  const renderWarning = () => {
    const helpNotRoom = liveHelpData?.filter(h => !h.userRoom);
    if (!helpNotRoom || helpNotRoom.length == 0) {
      return null;
    }
    return (
      <>
        <h1 style={{ color: 'red' }}>Kvietė pagalba ne kambaryje! (Kiekis: {helpNotRoom.length}) </h1>
        <br />
      </>
    )
  }

  const getDistance = (x) => {
    const roomData = liveData?.find(r => x.id == r.userRoom.id);
    if (!roomData) {
      return "Krauna";
    }
    return roomData?.distance === -1 ? "Per toli" : roomData?.distance;
  };

  return (
    <>
      <div className="room_page">
        <h1>Stebimo asmens: <strong>{selectedUser.name} {selectedUser.surname} </strong>profilis</h1>
        <br />
        <Button _hover={{ bg: "#5f9ea0" }} bg='#43b3ae' color='white' onClick={() => toggleFormStatus(null)}>
          Pridėti kambarį
        </Button>
        <br /> <br />
        {renderWarning()}
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
                      <Badge colorScheme="white">Atstumas: {getDistance(x)}</Badge>
                      {getHelp(x).length > 0 && <Badge colorScheme={"red"} onClick={() => toggleStatsStatus(x)}>Kvietė pagalba: {getHelp(x).length}</Badge>}   
                    </VStack >
                    <VStack h="100%" p={2}>
                      <Flex h="100%" />
                      <Flex flexDir="column" >
                        <Button mt={2} color="white" style={{ background: "green" }} onClick={() => toggleFormStatus(x)}>Redaguoti</Button>
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
      <Modal show={isOpen} onHide={() => toggleFormStatus(null)}>
        <Modal.Header closeButton>
          <Modal.Title> {selectedEditRoom ? "Atnaujinti kambario informaciją" : "Pridėti naują kambarį"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoomForm
            onRoomsChange={onRoomsChnage}
            userBeacons={userBeacons}
            toggleModal={toggleFormStatus}
            roomData={selectedEditRoom}
            supervisedUserId={params.id}
          />
        </Modal.Body>
      </Modal>
      <Modal show={selectedRoom} onHide={toggleStatsStatus}>
        <Modal.Header closeButton>
          <Modal.Title> Senelio pagalbos prašymo ataskaita </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1> Šiandien senelis <strong>{selectedUser.name} {selectedUser.surname} </strong> iškvietė {getHelp(selectedRoom).length} kartus pagalbą</h1>
          <br />
          <hr />
          {
            getHelp(selectedRoom)?.map(x => (
              <>
                <li style={{marginLeft: "10px"}}> {x.callTime?.split("T")[0]} {x.callTime?.split("T")[1]} {x?.userRoom?.name}</li>
              </>
            ))
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Rooms;