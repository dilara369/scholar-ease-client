import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: isRole = {}, isPending } = useQuery({
        queryKey: [user?.email, 'isRole'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role/${user?.email}`)
            return res.data
        }
    })
    return [isRole, isPending]
};

export default useRole;