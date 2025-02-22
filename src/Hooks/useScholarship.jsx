import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useState } from "react";

const useScholarship = () => {
    const axiosPublic = useAxiosPublic()
    const [searchValue, setsearchValue] = useState('')
    const { data: scholarships = [], refetch } = useQuery({
        queryKey: [searchValue, "scholarships"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/scholarships`)
            return res.data
        }
    })
    return [scholarships, refetch, setsearchValue, searchValue]
};

export default useScholarship;