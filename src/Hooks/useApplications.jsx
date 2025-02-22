import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useState } from "react";

const useApplications = () => {
    const [sortValue, setSortValue] = useState('')
    const axiosSecure = useAxiosSecure()
    const { data: applications = [] } = useQuery({
        queryKey: [sortValue, "applications"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/application?sort=${sortValue}`)
            return res.data
        }
    })
    return [applications, setSortValue, sortValue]
};

export default useApplications;