import { useState } from "react";
import useApplications from "../../../Hooks/useApplications";
import FeedBackModal from "../../../Components/Accessories/FeedBackModal/FeedBackModal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import ApplicationDtsModal from "../../../Components/Accessories/ApplicationDtsModal/ApplicationDtsModal";

const ManageApplications = () => {
    const [applications, setSortValue, sortValue] = useApplications();
    const axiosSecure = useAxiosSecure();
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isDetailsModal, setIsDetailsModal] = useState(false);
    const [application, setApplication] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    const handleFeedBack = (application) => {
        setApplication(application);
        setIsFeedbackModalOpen(true);
    };

    const handleCancleBtn = async (application) => {
        const id = application._id;
        try {
            const res = await axiosSecure.patch(`/application/${id}`, { status: "Rejected" });
            if (res.data.modifiedCount > 0) {
                toast.success(`Application has been rejected`, {
                    autoClose: 3000,
                    theme: "colored",
                    position: "top-center",
                });
            }
        } catch (err) {}
    };

    const handleDetailsBtn = (application) => {
        setApplication(application);
        setIsDetailsModal(true);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredApplications = applications.filter((app) =>
        app.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        app.phone.includes(searchTerm)
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-semibold mb-6 text-center">
                Total Applications: {filteredApplications.length}
            </h2>

            {/* Search and Sorting */}
            <div className="flex flex-col md:flex-row md:justify-between mb-6">
                <input
                    type="text"
                    placeholder="Search by name or phone..."
                    className="border p-3 rounded w-full md:w-1/3 mb-4 md:mb-0"
                    onChange={handleSearch}
                />
                <select
                    onChange={(e) => setSortValue(e.target.value)}
                    className="border p-3 rounded w-full md:w-1/3"
                >
                    <option disabled value="">Sort by</option>
                    <option value="appliedDate">Applied Date</option>
                    <option value="scholarshipDeadline">Scholarship Deadline</option>
                </select>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredApplications.map((application) => (
                    <div key={application._id} className="bg-white p-5 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold text-gray-700">{application.userName}</h2>
                        <p className="text-gray-500">Phone: {application.phone}</p>
                        <p className="text-gray-500">SSC Result: {application.sscResult}</p>
                        <p className="text-gray-500">Study Gap: {application.studyGap}</p>
                        <p className="text-gray-500">Deadline: {application.postdDate}</p>

                        {/* Status Badge */}
                        <span className={`inline-block px-3 py-1 text-white rounded-lg mt-3
                          ${application.status === "pending" ? "bg-yellow-500" : ""}
                          ${application.status === "processing" ? "bg-blue-500" : ""}
                          ${application.status === "rejected" ? "bg-red-500" : ""}
                        `}>
                            {application.status || "Pending"}
                        </span>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleDetailsBtn(application)}
                                className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                            >
                                Details
                            </button>
                            <button
                                onClick={() => handleFeedBack(application)}
                                className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                            >
                                Feedback
                            </button>
                            <button
                                onClick={() => handleCancleBtn(application)}
                                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {isFeedbackModalOpen && (
                <FeedBackModal
                    application={application}
                    setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                />
            )}
            {isDetailsModal && (
                <ApplicationDtsModal
                    application={application}
                    setIsDetailsModal={setIsDetailsModal}
                />
            )}
        </div>
    );
};

export default ManageApplications;
