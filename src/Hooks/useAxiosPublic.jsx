import axios from "axios";

const axiosPublic = axios.create({
    baseURL: `${import.meta.env.VITE_URL}`
})
const useAxiosPublic = () => {
    console.log(import.meta.env.VITE_URL)
    return axiosPublic
};

export default useAxiosPublic;