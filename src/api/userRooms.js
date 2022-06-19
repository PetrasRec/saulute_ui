import axios from "../axiosConfig";

const getUserRooms = async (userId) => axios.get(`/user/rooms/owner/${userId}`);

const getUserRoomsLiveData = async (userId) => axios.get(`/user/rooms/owner/${userId}/live`);

const getUserRoomsLiveHelpData = async (userId) => axios.get(`/user/rooms/owner/${userId}/live/help`);

const addUserRoom = async (userId, supervisedUserId, userRoom) => axios.post(`/user/rooms/owner/${userId}/supervisedUser/${supervisedUserId}`, userRoom);

const updateUserRoom = async (id, data) => axios.put(`/user/rooms/${id}`, data);

const deleteUserRoomsById = async (id) => axios.delete(`/user/rooms/${id}`);

export {
    getUserRooms,
    addUserRoom, 
    deleteUserRoomsById,
    getUserRoomsLiveData,
    getUserRoomsLiveHelpData,
    updateUserRoom,
};
