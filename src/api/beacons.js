import axios from "../axiosConfig";

const getBeacons = async () => axios.get("/beacons");

const editBeacon = async (id, beaconData) => axios.put(`/beacons/${id}`, beaconData);

const addBeacon = async (beaconData) => axios.post(`/beacons`, beaconData);

const deleteBeacon = async (id) => axios.delete(`/beacons/${id}`);

export {
  addBeacon,
  getBeacons,
  editBeacon,
  deleteBeacon,
};
