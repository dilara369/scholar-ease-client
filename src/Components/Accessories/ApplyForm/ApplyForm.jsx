import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyForm = (props = {}) => {
    const { data } = props || {}
    const { user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [isProcessing, setIsProcessing] = useState(false);
    const [userData, setUserData] = useState({})

    useEffect(() => {
        axiosSecure.get(`/user/${user?.email}`)
            .then(res => {
                setUserData(res.data)
            })
    }, [axiosSecure, user?.email])
    const userEmail = user?.email
    const userName = user?.displayName
    const userId = userData?._id
    const scholarshipId = data?._id
    const applicationDeadline = data?.applicationDeadline
    const handleImageUpload = async (image) => {
        const formData = new FormData();
        formData.append('image', image);
        try {
            const res = await axiosSecure.post(
                `${import.meta.env.VITE_IMAGE_API_URL}?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
                formData
            );
            return res.data.data.display_url;
        } catch {


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
        const applyInfo = {
            ...formData, userEmail, userName, userId, scholarshipId, applicationDeadline
        }


        const res = await axiosSecure.post('/application', applyInfo)

        if (res.data.insertedId) {
            toast.success('application submitted successful')
            navigate('/dashboard/myApplication')
        }
        setIsProcessing(false)
    }
    return (
        <div >
            <div className="p-8 bg-gray-100 mt-10">
                <h2 className="text-2xl font-semibold mb-6 text-center">Application Form</h2>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Applicant's Phone Number</label>
                        <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter phone number" required />
                    </div>
                    {/* Applicant Photo */}
                    <div>
                        <label htmlFor="photo" className="block text-gray-700 font-medium mb-2">Applicant Photo</label>
                        <input type="file" id="photo" name="photo" className="w-full px-4 py-2 border rounded-lg" accept="image/*" required />
                    </div>
                    {/* Address */}
                    <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Applicant Address</label>
                        <textarea id="address" name="address" className="w-full px-4 py-2 border rounded-lg" placeholder="Village, District, Country" rows="3" required></textarea>
                    </div>
                    {/* Gender */}
                    <div>
                        <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">Applicant Gender</label>
                        <select id="gender" name="gender" className="w-full px-4 py-2 border rounded-lg">
                            <option value="" disabled >Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>

                        </select>
                    </div>
                    {/* Degree */}
                    <div>
                        <label htmlFor="degree" className="block text-gray-700 font-medium mb-2">Applicant Applying Degree</label>
                        <select id="degree" name="degree" className="w-full px-4 py-2 border rounded-lg">
                            <option value="" disabled >Select degree</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Masters">Masters</option>
                        </select>
                    </div>
                    {/* SSC Result */}
                    <div>
                        <label htmlFor="sscResult" className="block text-gray-700 font-medium mb-2">SSC Result</label>
                        <input type="text" id="sscResult" name="sscResult" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter SSC result" required />
                    </div>
                    {/* HSC Result */}
                    <div>
                        <label htmlFor="hscResult" className="block text-gray-700 font-medium mb-2">HSC Result</label>
                        <input type="text" id="hscResult" name="hscResult" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter HSC result" required />
                    </div>
                    {/* Study Gap */}
                    <div>
                        <label htmlFor="studyGap" className="block text-gray-700 font-medium mb-2">Study Gap (Optional)</label>
                        <select id="studyGap" name="studyGap" className="w-full px-4 py-2 border rounded-lg">
                            <option value="" disabled >Select gap duration</option>
                            <option value="1 year">1 year</option>
                            <option value="2 years">2 years</option>
                            <option value="3 years">3 years</option>
                        </select>
                    </div>
                    {/* University Name (Read-Only) */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">University Name</label>
                        <input type="text" name="universityName" value={data.universityName} className="w-full px-4 py-2 border rounded-lg bg-gray-200" readOnly />
                    </div>
                    {/* Scholarship Category (Read-Only) */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Scholarship Category</label>
                        <input type="text"
                            name="scholarshipCategory"
                            value={data.scholarshipCategory}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                            readOnly />
                    </div>
                    {/* Application fee (Read-Only) */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Application Fee</label>
                        <input
                            type="text"
                            name="applicationFees"
                            value={data.applicationFees}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200" readOnly />
                    </div>
                    {/* Subject Category (Read-Only) */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Subject Category</label>
                        <input type="text"
                            name="subjectCategory"
                            value={data.subjectCategory}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200" readOnly />
                    </div>
                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <button type="submit" className="w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-green-500 hover:scale-105 duration-300 hover:shadow-2xl">
                            {isProcessing ? " Processing..." : "Submit  Application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyForm;