import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ReviewModal from "../../../Components/Accessories/ReviewModal/ReviewModal";

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewData, setReviewData] = useState({});
    const { data: reviews = [], refetch } = useQuery({
        queryKey: [user.email, "review"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/${user.email}`);
            return res.data;
        }
    });

    const handleCancelBtn = async (review) => {
        try {
            const res = await axiosSecure.delete(`/review/${review._id}`);
            if (res.data.deletedCount > 0) {
                toast.success(`Review deleted successfully`, {
                    autoClose: 3000,
                    theme: 'colored',
                    position: 'top-center'
                });
                refetch();
            }
        } catch (err) {
            toast.error("Failed to delete review", {
                autoClose: 3000,
                theme: 'colored',
                position: 'top-center'
            });
        }
    };

    const handleReviewBtn = (data) => {
        setReviewData(data);
        setIsModalOpen(true);
    };

    const handleReviewSubmit = async (data) => {
        const { rating, comment, applicationId: id } = data;

        try {
            const res = await axiosSecure.patch(`/review`, { rating, comment, id });
            if (res.data.modifiedCount > 0) {
                toast.success(`Review updated successfully`, {
                    autoClose: 3000,
                    theme: 'colored',
                    position: 'top-center'
                });
                refetch();
            }
        } catch (err) {
            toast.error("Failed to update review", {
                autoClose: 3000,
                theme: 'colored',
                position: 'top-center'
            });
        }

        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Your Applied Scholarship Reviews: {reviews.length}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews?.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                        <h3 className="text-xl font-semibold text-blue-600">{review?.scholarshipName}</h3>
                        <p className="text-sm text-gray-500">{review?.universityName}</p>
                        
                        <div className="mt-3">
                            <h4 className="font-medium">Review:</h4>
                            <p className="text-gray-700">{review.comment || 'No Comment'}</p>
                        </div>

                        <div className="mt-3">
                            <p className="text-xs text-gray-400">Reviewed on: {review.reviewDate}</p>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => handleReviewBtn(review)}
                                className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleCancelBtn(review)}
                                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && <ReviewModal
                data={reviewData}
                user={user}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleReviewSubmit}
            />}
        </div>
    );
};

export default MyReviews;
