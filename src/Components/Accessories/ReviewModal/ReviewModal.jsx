
// import { useState } from "react";
// import { Rating } from "@smastrom/react-rating";
// import "@smastrom/react-rating/style.css";

// const ReviewModal = ({ scholarship, user, onClose, onSubmit }) => {
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState("");
//     const [reviewDate, setReviewDate] = useState(new Date().toISOString().split("T")[0]);
//     const [isClosing, setIsClosing] = useState(false); // For handling close animation

//     const handleSubmit = () => {
//         const reviewData = {
//             rating,
//             comment,
//             reviewDate,
//             scholarshipName: scholarship.scholarshipName,
//             universityName: scholarship.universityName,
//             scholarshipId: scholarship._id,
//             userName: user.displayName,
//             userImage: user.photoURL || null,
//             userEmail: user.email,
//         };
//         onSubmit(reviewData);
//     };

//     const handleClose = () => {
//         setIsClosing(true); // Trigger the closing animation
//         setTimeout(onClose, 300); // Close modal after animation duration
//     };

//     return (
//         <div
//             className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]
//             ${isClosing ? "opacity-0 transition-opacity duration-300" : "opacity-100 transition-opacity duration-300"}`}
//         >
//             <div
//                 className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-transform duration-300 
//                 ${isClosing ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
//             >
//                 <h2 className="text-xl font-semibold mb-4">Add Review</h2>
//                 <div className="mb-4">
//                     <label className="block font-medium mb-1">Rating Point</label>
//                     <Rating
//                         value={rating}
//                         onChange={setRating}
//                         style={{ maxWidth: 150 }}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block font-medium mb-1">Review Comment</label>
//                     <textarea
//                         className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         rows="4"
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                     ></textarea>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block font-medium mb-1">Review Date</label>
//                     <input
//                         type="date"
//                         className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={reviewDate}
//                         onChange={(e) => setReviewDate(e.target.value)}
//                     />
//                 </div>
//                 <div className="mb-4 text-left">
//                     <p>
//                         <strong>Scholarship Name : </strong>
//                         {scholarship.scholarshipName}
//                     </p>
//                     <p>
//                         <strong>University Name : </strong>
//                         {scholarship.universityName}
//                     </p>
//                     <p>
//                         <strong>User Name : </strong>
//                         {user.displayName}
//                     </p>
//                     <p>
//                         <strong>User Email : </strong>
//                         {user.email}
//                     </p>
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                     <button
//                         className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-200"
//                         onClick={handleClose}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-200 ${!rating || !comment ? "opacity-50 cursor-not-allowed" : ""
//                             }`}
//                         onClick={handleSubmit}
//                         disabled={!rating || !comment}
//                     >
//                         Submit Review
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReviewModal;
// ---------------------------------
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewModal = ({ data, user, onClose, onSubmit }) => {
    const [rating, setRating] = useState(data?.rating || 0);
    const [comment, setComment] = useState(data?.comment || '');
    const reviewDate = new Date().toISOString().split("T")[0];
    const [isClosing, setIsClosing] = useState(false); // For handling close animation
    const handleSubmit = () => {

        const reviewData = {
            rating,
            comment,
            reviewDate,
            scholarshipName: data.scholarshipName,
            universityName: data.universityName,
            scholarshipId: data.scholarshipId,
            applicationId: data._id,
            userName: user.displayName,
            userImage: user.photoURL || null,
            userEmail: user.email,
        };
        onSubmit(reviewData);
    };

    const handleClose = () => {
        setIsClosing(true); // Trigger the closing animation
        setTimeout(onClose, 700); // Close modal after animation duration
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-1000 
            ${isClosing ? "opacity-0" : "opacity-100"}`}
        >
            <div
                className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-all duration-700 
                ${isClosing ? "translate-y-10 scale-95 opacity-0" : "translate-y-0 scale-105 opacity-100"}`}
            >
                <h2 className="text-xl font-semibold mb-4">{rating && comment ? "Edit Review" : "Add Review"}</h2>
                <div className="mb-4">
                    <label className="block font-medium mb-1">Rating Point</label>
                    <Rating
                        value={rating}
                        onChange={setRating}
                        style={{ maxWidth: 150 }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-1">Review Comment</label>
                    <textarea
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        defaultValue={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-1">Review Date</label>
                    <input
                        type="date"
                        className="w-full border  cursor-not-allowed rounded-lg p-2   "
                        value={reviewDate}
                        readOnly
                    />
                </div>
                <div className="mb-4 text-left">
                    <p>
                        <strong>Scholarship Name : </strong>
                        {data.scholarshipName}
                    </p>
                    <p>
                        <strong>University Name : </strong>
                        {data.universityName}
                    </p>
                    <p>
                        <strong>User Name : </strong>
                        {user.displayName}
                    </p>
                    <p>
                        <strong>User Email : </strong>
                        {user.email}
                    </p>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 ${!rating || !comment ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={handleSubmit}
                        disabled={!rating || !comment}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
