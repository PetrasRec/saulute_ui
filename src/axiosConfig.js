import axios from "axios";

const axiosConfig = axios.create({
    baseURL: 'https://localhost:44345',
    withCredentials: true
})

axiosConfig.defaults.headers.common['Content-Type'] = 'application/json';



const handleErr = (err) => {
    console.log(err);
    if (err instanceof Error) {
        return { data: err.response.data, isError: true };
    }
    return err;
}

axiosConfig.interceptors.response.use(
    handleErr,
    handleErr);
export default axiosConfig;