
import { FaSearch } from "react-icons/fa";
import ScholarshipCart from "../../Components/Accessories/ScholarshipCart/ScholarshipCart";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllScholarship = () => {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 6;
    const axiosPublic = useAxiosPublic();

    // Fetch scholarship data using React Query
    const { data = {}, refetch, isLoading } = useQuery({
        queryKey: [searchValue, currentPage], // Dependency array for query
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/scholarship?search=${searchValue}&page=${currentPage + 1}&limit=${limit}`
            );
            return res.data;
        },
        keepPreviousData: true, // Maintain previous data while fetching new
    });

    // Calculate total pages
    const totalItems = data?.totalitems || 0;
    const numberOfPages = Math.ceil(totalItems / limit);
    const pages = Array.from({ length: numberOfPages }, (_, i) => i);

    return (
        <div>
            {/* Search Bar */}
            <div className="flex justify-center my-5 py-2">
                <div className="border-2 border-secondary/50 flex gap-3 py-1 items-center px-4 rounded-full mt-10">
                    <h1 className="text-secondary/50">
                        <FaSearch />
                    </h1>
                    <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        type="text"
                        className="py-2 pr-40 focus:outline-none focus:ring-0"
                        placeholder="Search Scholarships..."
                    />
                </div>
            </div>

            {/* Scholarship List */}
            <div className="min-h-[90vh]">
                {isLoading ? (
                    <h1 className="text-4xl text-center text-secondary">Loading...</h1>
                ) : data?.result?.length ? (
                    <div className="w-10/12 mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data?.result?.map((scholarship) => (
                                <ScholarshipCart key={scholarship._id} data={scholarship} />
                            ))}
                        </div>

                        {/* Pagination Buttons */}
                        <div className="flex justify-center my-10">
                            {pages.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`border py-1 px-3 rounded-md ml-2 ${currentPage === page ? "bg-secondary text-white" : "bg-white"
                                        }`}
                                >
                                    {page + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-6xl text-secondary text-center">
                            No scholarships available
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllScholarship;
