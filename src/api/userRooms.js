import axios from "../axiosConfig";

const getUserRooms = async (userId) => axios.get(`/user/rooms/owner/${userId}`);
const getUserRoomsLiveData = async (userId) => axios.get(`/user/rooms/owner/${userId}/live`);

const getUserRoomsLiveHelpData = async (userId) => axios.get(`/user/rooms/owner/${userId}/live/help`);
const addUserRoom = async (userId, userRoom) => axios.post(`/user/rooms/owner/${userId}`, userRoom);
const deleteUserRoomsById = async (id) => axios.delete(`/user/rooms/${id}`);

export {
    getUserRooms,
    addUserRoom, 
    deleteUserRoomsById,
    getUserRoomsLiveData,
    getUserRoomsLiveHelpData,
};
