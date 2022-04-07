import axios from "../axiosConfig";

const getSupervisedUsers = async (userId) => axios.get(`/supervised/users/${userId}`);

const deleteSupervisedUsers = async (id) => axios.delete(`/supervised/users/${id}`);

const createSupervisedUsers = async (userId, data) => axios.post(`/supervised/users/${userId}`, data);
const updateSupervisedUsers = async (id, data) => axios.put(`/supervised/users/${id}`, data);

export {
    getSupervisedUsers,
    deleteSupervisedUsers,
    createSupervisedUsers,
    updateSupervisedUsers,
};