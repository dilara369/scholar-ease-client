import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ApplicationEditModal = ({ scholarship, onClose, setIsEditModalOpen, refetch }) => {
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

        const res = await axiosSecure.put(`/application/${scholarship._id}`, formData)

        if (res.data.modifiedCount > 0) {
            toast.success('application updated successful', {
                theme: 'colored',
                position: 'top-center',
                autoClose: 3000
            })
            refetch()
            setIsEditModalOpen(false)
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
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg ">
                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Applicant's Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    defaultValue={scholarship.phone}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Enter phone number"
                                    required />
                            </div>
                            {/* Applicant Photo */}
                            <div className="flex items-end gap-1">
                                <div>
                                    <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">Applicant Photo</label>
                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        accept="image/*"
                                    />
                                </div>
                                {/* <img className="w-10 h-10 rounded-lg object-cover" src={scholarship.photo} alt="" /> */}
                            </div>
                            {/* Address */}
                            <div className="md:col-span-2">
                                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Applicant Address</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    defaultValue={scholarship.address}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Village, District, Country" rows="3" required></textarea>
                            </div>
                            {/* Gender */}
                            <div>
                                <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">Applicant Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    defaultValue={scholarship.gender}
                                    className="w-full px-4 py-2 border rounded-lg">
                                    <option value="" disabled >Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>

                                </select>
                            </div>
                            {/* Degree */}
                            <div>
                                <label htmlFor="degree" className="block text-gray-700 font-medium mb-2">Applicant Applying Degree</label>
                                <select
                                    id="degree"
                                    name="degree"
                                    defaultValue={scholarship.degree}
                                    className="w-full px-4 py-2 border rounded-lg">
                                    <option value="" disabled >Select degree</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Masters">Masters</option>
                                </select>
                            </div>
                            {/* SSC Result */}
                            <div>
                                <label htmlFor="sscResult" className="block text-gray-700 font-medium mb-2">SSC Result</label>
                                <input
                                    type="text"
                                    id="sscResult"
                                    name="sscResult"
                                    defaultValue={scholarship.sscResult}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Enter SSC result" required />
                            </div>
                            {/* HSC Result */}
                            <div>
                                <label htmlFor="hscResult" className="block text-gray-700 font-medium mb-2">HSC Result</label>
                                <input
                                    type="text"
                                    id="hscResult"
                                    name="hscResult"
                                    defaultValue={scholarship.hscResult}
                                    className="w-full px-4 py-2 border rounded-lg" placeholder="Enter HSC result" required />
                            </div>
                            {/* Study Gap */}
                            <div>
                                <label htmlFor="studyGap" className="block text-gray-700 font-medium mb-2">Study Gap (Optional)</label>
                                <select id="studyGap"
                                    name="studyGap"
                                    defaultValue={scholarship.studyGap}
                                    className="w-full px-4 py-2 border rounded-lg">
                                    <option value="" disabled >Select gap duration</option>
                                    <option value="1 year">1 year</option>
                                    <option value="2 years">2 years</option>
                                    <option value="3 years">3 years</option>
                                </select>
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

export default ApplicationEditModal;