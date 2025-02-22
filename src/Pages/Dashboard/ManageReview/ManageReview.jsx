import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { toast } from "react-toastify";

const ManageReview = () => {
    const axiosSecure = useAxiosSecure();
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reviews");
            return res.data;
        }
    });

    const handleDeleteBtn = async (review) => {
        try {
            const res = await axiosSecure.delete(`/review/${review._id}`);

            if (res.data.deletedCount > 0) {
                toast.success(`${review.userName} review has been deleted`, {
                    autoClose: 3000,
                    theme: "colored",
                    position: "top-center"
                });
                refetch();
            }
        } catch (err) {
            console.error("Error deleting review:", err);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
                Total Reviews: {reviews.length}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-white shadow-lg rounded-2xl p-6 text-center transition duration-300 hover:shadow-2xl">
                        <div className="flex justify-center mb-4">
                            <img className="w-24 h-24 object-cover rounded-full border-4 border-blue-400" src={review.userImage} alt="User" />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800">{review.userName}</h1>
                        <h2 className="text-sm text-gray-500">{review.universityName}</h2>
                        <h3 className="text-blue-500 font-medium">{review.scholarshipName}</h3>
                        <div className="flex justify-center mt-2">
                            <Rating style={{ maxWidth: 120 }} value={review.rating} readOnly />
                        </div>
                        <p className="mt-2 text-gray-600 italic">"{review.comment}"</p>
                        <p className="text-xs text-gray-400 mt-1">{review.reviewDate}</p>
                        <button
                            onClick={() => handleDeleteBtn(review)}
                            className="mt-4 bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-2 px-5 rounded-lg shadow-md hover:scale-105">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageReview;
