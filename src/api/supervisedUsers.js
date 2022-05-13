import axios from "../axiosConfig";

const getSupervisedUsers = async (userId) => axios.get(`/supervised/users/${userId}`);

const deleteSupervisedUsers = async (id) => axios.delete(`/supervised/users/${id}`);

const createSupervisedUsers = async (userId, data) => axios.post(`/supervised/users/${userId}`, data);
const updateSupervisedUsers = async (id, data) => axios.put(`/supervised/users/${id}`, data);
const getSupervisedUserById = async (id) => axios.get(`/supervised/users/${id}/info`);

//const CreateRoom = async (id) => axios.get(`/supervised/users/${id}/info`);


export {
    getSupervisedUsers,
    deleteSupervisedUsers,
    createSupervisedUsers,
    updateSupervisedUsers,
    getSupervisedUserById,
};
