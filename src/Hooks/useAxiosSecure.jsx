import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    // baseURL: `https://scholar-ease-server.vercel.app`
    baseURL: `${import.meta.env.VITE_URL}`
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { userSignOut } = useAuth()
    // requst interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const rawToken = localStorage.getItem('access-token');
  
  // Add validation
  if (!rawToken || rawToken.split('.').length !== 3) {
    localStorage.removeItem('access-token');
    window.location.replace('/login');
    return Promise.reject('Invalid token format');
  }

  config.headers.Authorization = `Bearer ${rawToken}`;
        return config
    }, function (error) {
        // Do somthing with request error
        return Promise.reject(error)
    })
    // interceptor 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response
    },
        async (error) => {
            const status = error.response.status
            if (status === 401 || status === 403) {
                await userSignOut()
                navigate('/login')
            }

            return Promise.reject(error)
        })
    return axiosSecure
};

export default useAxiosSecure;