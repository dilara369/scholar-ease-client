import { useNavigate } from "react-router-dom";
import useScholarship from "../../../Hooks/useScholarship";
import { useState } from "react";
import EditScholarshipForm from "../../../Components/Accessories/EditScholarshipForm/EditScholarshipForm";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";


const ManageScholarships = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [scholarships, refetch] = useScholarship();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scholarshipData, setScholarshipData] = useState({});
    const handleEditFormSubmitBtn = (data) => {
        setScholarshipData(data);
        setIsModalOpen(true);
    };
    const handleCancelBtn = async (scholarship) => {
        try {
            const res = await axiosSecure.delete(`/scholarship/${scholarship._id}`);
            if (res.data.deletedCount > 0) {
                toast.success(`${scholarship?.scholarshipName} deleted`, {
                    autoClose: 3000,
                    theme: "colored",
                    position: "top-center",
                });
                refetch();
            }
        } catch (err) {
            toast.error("Failed to delete scholarship");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">
                Total Scholarships: {scholarships.length}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scholarships.map((scholarship) => (
                    <div
                        key={scholarship._id}
                        className="bg-white shadow-lg rounded-lg p-5 border border-gray-200"
                    >
                        <h3 className="text-xl font-semibold text-gray-700">
                            {scholarship?.scholarshipName}
                        </h3>
                        <p className="text-gray-600">
                            {scholarship?.universityName}, {scholarship?.universityCountry}
                        </p>
                        <p className="text-gray-500 text-sm">
                            Category: <span className="font-medium">{scholarship.subjectCategory}</span>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Degree: <span className="font-medium">{scholarship.degree}</span>
                        </p>
                        <p className="text-gray-700 font-semibold mt-2">
                            Application Fees: <span className="text-blue-600">${scholarship.applicationFees}</span>
                        </p>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => navigate(`/scholarshipDetails/${scholarship._id}`)}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
                            >
                                <FaInfoCircle /> Details
                            </button>
                            <button
                                onClick={() => handleEditFormSubmitBtn(scholarship)}
                                className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                onClick={() => handleCancelBtn(scholarship)}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <EditScholarshipForm
                    scholarship={scholarshipData}
                    onClose={() => setIsModalOpen(false)}
                    refetch={refetch}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
};

export default ManageScholarships;
