import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const EditScholarshipForm = ({ scholarship, setIsModalOpen, refetch, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const axiosSecure = useAxiosSecure()
    const handleImageUpload = async (image) => {
        const formData = new FormData();
        formData.append('image', image);
        try {
            const res = await axiosSecure.post(
                `${import.meta.env.VITE_IMAGE_API_URL}?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
                formData
            );
            return res.data.data.display_url;
        } catch (error) {
            console.error('Error uploading image:', error);

            return null;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsProcessing(true)
        const form = new FormData(e.target)
        const formData = Object.fromEntries(form.entries())

        // Handle the image upload
        const imageFile = form.get('photo');

        if (imageFile.size > 0) {
            const uploadedImageUrl = await handleImageUpload(imageFile);

            if (uploadedImageUrl) {
                formData.photo = uploadedImageUrl;
            }
        }

        const res = await axiosSecure.put(`/scholarship/${scholarship._id}`, formData)

        if (res.data.modifiedCount > 0) {
            toast.success('application updated successful', {
                theme: 'colored',
                position: 'top-center',
                autoClose: 3000
            })
            refetch()
            setIsModalOpen(false)
        }
        setIsProcessing(false)
    }

    const handleClose = () => {
        setIsClosing(true); // Trigger closing animation
        setTimeout(() => {
            setIsClosing(false); // Reset animation state for next open
            onClose(); // Close modal after animation
        }, 700);
    };

    return (
        <div>
            <div
                className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-1000 ${isClosing ? "opacity-0 " : "opacity-100 "
                    }`}
            >
                <div
                    className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-xl transform transition-all duration-1000 ${isClosing ? "translate-y-10 scale-95 opacity-0 " : "translate-y-0 scale-105 opacity-100 "
                        }`}
                >
                    <h2 className="text-xl font-semibold mb-4 text-center">Update the Form</h2>
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                    >
                        {/* First Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Scholarship Name</label>
                                <input
                                    type="text"
                                    name="scholarshipName"
                                    defaultValue={scholarship.scholarshipName}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">University Name</label>
                                <input
                                    type="text"
                                    name="universityName"
                                    defaultValue={scholarship.universityName}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>

                        {/* University Image Upload */}
                        <div>
                            <label className="block font-medium">University Image/Logo</label>
                            <input
                                type="file"
                                name="photo"
                                className="w-full p-2"
                                required
                            />
                        </div>

                        {/* Other Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">University Country</label>
                                <input
                                    type="text"
                                    name="universityCountry"
                                    defaultValue={scholarship.universityCountry}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">University City</label>
                                <input
                                    type="text"
                                    name="universityCity"
                                    defaultValue={scholarship.universityCity}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>

                        {/* Dropdown Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Subject Category</label>
                                <select
                                    defaultValue={scholarship.subjectCategory}
                                    name="subjectCategory"
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option disabled value="">Select</option>
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Doctor">Doctor</option>

                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">Scholarship Category</label>
                                <select
                                    defaultValue={scholarship.scholarshipCategory}
                                    name="scholarshipCategory"
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option disabled value="">Select</option>
                                    <option value="Full fund">Full fund</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Self-fund">Self-fund</option>
                                </select>
                            </div>
                        </div>

                        {/* Degree and Fees */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Degree</label>
                                <select
                                    defaultValue={scholarship.degree}
                                    name="degree"
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option disabled value="">Select</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Masters">Masters</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium">Tuition Fees (Optional)</label>
                                <input
                                    defaultValue={scholarship.tuitionFees}
                                    type="number"
                                    name="tuitionFees"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>

                        {/* Application Fees and Service Charge */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Application Fees</label>
                                <input
                                    type="number"
                                    defaultValue={scholarship.applicationFees}
                                    name="applicationFees"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Service Charge</label>
                                <input
                                    type="number"
                                    defaultValue={scholarship.serviceCharge}
                                    name="serviceCharge"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>

                        {/* Dates and Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium">Application Deadline</label>
                                <input
                                    type="date"
                                    defaultValue={scholarship.applicationDeadline}
                                    name="applicationDeadline"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Posted User Email</label>
                                <input
                                    value={scholarship.postedUserEmail}
                                    type="email"
                                    name="postedUserEmail"
                                    readOnly
                                    className="w-full p-2 border rounded cursor-not-allowed"
                                    required
                                />
                            </div>

                        </div>

                        <div className="flex justify-end space-x-4 m">
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300"
                            >
                                {isProcessing ? "Processing..." : "Submit"}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default EditScholarshipForm;