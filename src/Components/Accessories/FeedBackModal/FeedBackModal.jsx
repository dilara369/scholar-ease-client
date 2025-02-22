import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const FeedBackModal = (props = {}) => {
    const { application, setIsFeedbackModalOpen } = props || {}
    const axiosSecure = useAxiosSecure()
    const [isClosing, setIsClosing] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const feedback = form.get('feedback')
        const id = application._id

        try {
            const res = await axiosSecure.patch(`/application`, { feedback, id })

            if (res.data.modifiedCount > 0) {
                toast.success(`FeedBack given completed`, {
                    autoClose: 3000,
                    theme: 'colored',
                    position: 'top-center'
                })

            }
        } catch (err) {

        }

        setIsFeedbackModalOpen(false)
    }
    return (
        <div >
            <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-1000 ${isClosing ? "opacity-0 " : "opacity-100 "
                }`}>
                <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-xl transform transition-all duration-1000 ${isClosing ? "translate-y-10 scale-95 opacity-0 " : "translate-y-0 scale-105 opacity-100 "}`}>
                    <h2 className="text-xl font-semibold mb-4 text-center">FeedBack</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex-col flex space-y-2">
                        <textarea
                            name="feedback"
                            className="p-3 border rounded-md mb-3"
                            placeholder="Type here..."
                        >

                        </textarea>
                        <div className="flex  gap-3">
                            <button
                                type="button"
                                className="bg-gray-500  text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300"
                                onClick={() => setIsFeedbackModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-secondary flex-1 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedBackModal;