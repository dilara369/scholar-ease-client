import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import ReviewModal from "../../../Components/Accessories/ReviewModal/ReviewModal";
import { useNavigate } from "react-router-dom";
import ApplicationEditModal from "../../../Components/Accessories/ApplicationEditModal/ApplicationEditModal";

const MyApplication = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [applicationData, setApplicationData] = useState({})
    const [editApplicationData, setEditApplicationData] = useState({})
    const { data: applications = [], refetch } = useQuery({
        queryKey: [user.email, "applications"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/application/${user.email}`)
            return res.data
        }
    })

    const handleCancelBtn = async (scholarship) => {
        try {
            const res = await axiosSecure.delete(`/application/${scholarship._id}`)
            if (res.data.deletedCount > 0) {
                toast.success(`${scholarship?.scholarshipName} deleted`, {
                    autoClose: 3000,
                    theme: 'colored',
                    position: 'top-center'
                })
                refetch()
            }
        } catch (err) {}
    }
    const handleReviewBtn = (data) => {
        setApplicationData(data)
        setIsModalOpen(true)
    }
    const handleEditBtn = (data) => {
        setEditApplicationData(data)
        setIsEditModalOpen(true)
    }
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold mb-6 text-center text-blue-700">Your Applied Scholarships ({applications?.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications?.map((scholarship) => (
                    <div key={scholarship._id} className="bg-white p-5 shadow-lg rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">{scholarship?.universityName}</h3>
                        <p className="text-gray-600">{scholarship?.universityCity}, {scholarship?.universityCountry}</p>
                        <p className="text-gray-500 mt-2">Applied Degree: <span className="font-medium">{scholarship.degree}</span></p>
                        <p className="text-gray-500">Application Fees: <span className="text-green-600 font-medium">${scholarship.applicationFees}</span></p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm ${scholarship.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                            {scholarship?.status || 'Pending'}
                        </span>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <button onClick={() => navigate(`/scholarshipDetails/${scholarship.scholarshipId}`)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Details</button>
                            {scholarship?.status === "pending" ? (
                                <button onClick={() => handleEditBtn(scholarship)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Edit</button>
                            ) : (
                                <button disabled className="bg-gray-400 text-white px-3 py-1 rounded">Edit</button>
                            )}
                            <button onClick={() => handleCancelBtn(scholarship)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Cancel</button>
                            <button onClick={() => handleReviewBtn(scholarship)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Add Review</button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && <ReviewModal data={applicationData} user={user} onClose={() => setIsModalOpen(false)} />}
            {isEditModalOpen && <ApplicationEditModal scholarship={editApplicationData} onClose={() => setIsEditModalOpen(false)} refetch={refetch} />}
        </div>
    );
};

export default MyApplication;
