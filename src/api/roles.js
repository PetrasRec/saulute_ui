import axios from "../axiosConfig";

const getAllRoles = async () => axios.get("/roles", null, { withCredentials: true });

export {
    getAllRoles
};
