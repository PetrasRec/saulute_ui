import axios from "../axiosConfig";

const getBeacons = async () => axios.get("/beacons");

const getRssiBeacons = async () => axios.get("/rssi/beacons");

const editBeacon = async (id, beaconData) => axios.put(`/beacons/${id}`, beaconData);

const addBeacon = async (beaconData) => axios.post(`/beacons`, beaconData);

const addUserBeacon = async (userId, beaconData) => axios.post(`/beacons/${userId}/users`, beaconData);

const getUserBeacons = async (userId, beaconData) => axios.get(`/beacons/${userId}/users`, beaconData);

const getRssiBeaconRooms = async (beaconId) => axios.get(`/rssi/beacons/${beaconId}/rooms`);

const deleteBeacon = async (id) => axios.delete(`/beacons/${id}`);

export {
  addBeacon,
  getBeacons,
  editBeacon,
  deleteBeacon,
  getRssiBeacons,
  addUserBeacon,
  getUserBeacons,
  getRssiBeaconRooms,
};
