import axios from "../axiosConfig";

const getUsers = async () => axios.get("/users");

const editUser = async (id, userData) => axios.put(`/users/${id}`, userData);

const addUser = async (userData) => axios.post("/users", userData);

const getUser = async(userData) => axios.get("/users/profile", userData);

const getUserById = async(id) => axios.get(`/users/${id}`);

const getProfile = async() => axios.get("/users/profile");

export {
    getUsers,
    editUser,
    addUser,
    getUser,
    getProfile,
    getUserById,
};
