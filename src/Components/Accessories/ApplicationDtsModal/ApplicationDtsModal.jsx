
const ApplicationDtsModal = (props = {}) => {
    const { application, setIsDetailsModal } = props || {}

    return (
        <div>
            <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-1000 `}>
                <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-xl transform transition-all duration-1000 `}>
                    <h2 className="text-xl font-semibold mb-4 text-center">Application Details</h2>

                    <div className=" rounded-md lex justify-center text-center  p-4 ">
                        <div >
                            <div className="flex justify-center">
                                <img className="w-40  h-40 object-cover rounded-full" src={application?.photo} alt="" />
                            </div>
                            <h1 className="mt-2 font-semibold">{application?.userName}</h1>
                            <h1 className="mb-1">{application?.phone}</h1>
                            <h1>{application?.universityName}</h1>
                            <h1 > {application?.subjectCategory}</h1>


                        </div>
                    </div>
                    <div className="">
                        <button
                            type="button"
                            className="bg-primary w-full text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 mt-5"
                            onClick={() => setIsDetailsModal(false)}
                        >
                            Back
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ApplicationDtsModal;