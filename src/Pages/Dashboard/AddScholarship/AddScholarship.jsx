import { useState } from 'react';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddScholarship = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const postDate = new Date().toLocaleDateString("en-GB");

    // Reusable Input Component
    const InputField = ({ label, type = "text", name, required = false, value, onChange }) => (
        <div className="w-full">
            <label className="block font-medium text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                required={required}
            />
        </div>
    );

    const SelectField = ({ label, name, options, required = false }) => (
        <div className="w-full">
            <label className="block font-medium text-gray-700">{label}</label>
            <select name={name} className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500" required={required}>
                <option value="">Select</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );

    const handleImageUpload = async (image) => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_IMAGE_API_URL}?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
                formData
            );
            return res.data.data.display_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload the image. Please try again.');
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());

        const imageFile = form.get('universityImage');

        if (!imageFile || imageFile.size === 0) {
            toast.error('Please select an image to upload.');
            setLoading(false);
            return;
        }

        const uploadedImageUrl = await handleImageUpload(imageFile);

        if (!uploadedImageUrl) {
            toast.error('Image upload failed. Cannot proceed.');
            setLoading(false);
            return;
        }

        formData.universityImage = uploadedImageUrl;

        try {
            const res = await axiosSecure.post('/scholarship', { ...formData, postDate });
            if (res.data.insertedId) {
                toast.success(`Scholarship added successfully`, { autoClose: 2000 });
                e.target.reset();
            }
        } catch (error) {
            console.error("Error adding scholarship:", error);
            toast.error("Failed to add scholarship.");
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div className="p-6 mx-auto max-w-3xl bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Add Scholarship</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Scholarship Name" name="scholarshipName" required />
                    <InputField label="University Name" name="universityName" required />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium text-gray-700">University Image/Logo</label>
                    <input type="file" name="universityImage" className="w-full p-2 border rounded" required />
                </div>

                {/* Location Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="University Country" name="universityCountry" required />
                    <InputField label="University City" name="universityCity" required />
                </div>

                {/* Dropdown Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField label="Subject Category" name="subjectCategory" required options={["Agriculture", "Engineering", "Doctor"]} />
                    <SelectField label="Scholarship Category" name="scholarshipCategory" required options={["Full fund", "Partial", "Self-fund"]} />
                </div>

                {/* Degree and Fees */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField label="Degree" name="degree" required options={["Diploma", "Bachelor", "Masters"]} />
                    <InputField label="Tuition Fees (Optional)" name="tuitionFees" type="number" />
                </div>

                {/* Application Fees and Service Charge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Application Fees" name="applicationFees" type="number" required />
                    <InputField label="Service Charge" name="serviceCharge" type="number" required />
                </div>

                {/* Dates and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Application Deadline" name="applicationDeadline" type="date" required />
                    <InputField label="Posted User Email" name="postedUserEmail" value={user?.email} required />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-2 text-white font-bold rounded transition duration-300 ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default AddScholarship;
