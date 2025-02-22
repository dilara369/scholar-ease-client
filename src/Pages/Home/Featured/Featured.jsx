import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import ScholarshipCart from "../../../Components/Accessories/ScholarshipCart/ScholarshipCart";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const Featured = () => {
    const [scholarships, setScholarships] = useState([]);
    const axiosPublic = useAxiosPublic();


    useEffect(() => {
        axiosPublic.get('/featuredScholarship')
            .then(res => {
                setScholarships(res.data);
            });
    }, [axiosPublic]);

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-semibold text-center text-gray-900 mb-12">Top Featured Scholarships</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {scholarships.map(scholarship => (
                    <ScholarshipCart
                        key={scholarship._id}
                        data={scholarship}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-10">
                <Link to={'/allScholarship'}>
                    <button className="inline-flex items-center px-6 py-3 mt-4 font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                        <span>See More</span>
                        <FaArrowAltCircleRight className="ml-2" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Featured;
