import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GoLaw } from "react-icons/go";
import { MdAgriculture, MdScience } from "react-icons/md";


const ScholarshipCategories = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-semibold text-center text-gray-800 mb-12">Scholarship Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Doctor Card */}
                <div className="bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col justify-center items-center p-8 text-center">
                        <h1 className="text-6xl text-primary mb-4"><FaUserDoctor /></h1>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Doctor</h2>
                        <p className="text-gray-600 mb-6">Explore scholarships for medical students.</p>
                        <div className="mt-4">
                            <button className="bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-dark transition-all flex items-center gap-2">
                                Go <FaArrowAltCircleRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Agriculture Card */}
                <div className="bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col justify-center items-center p-8 text-center">
                        <h1 className="text-6xl text-primary mb-4"><MdAgriculture /></h1>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Agriculture</h2>
                        <p className="text-gray-600 mb-6">Find scholarships for agricultural studies.</p>
                        <div className="mt-4">
                            <button className="bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-dark transition-all flex items-center gap-2">
                                Go <FaArrowAltCircleRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Law Card */}
                <div className="bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col justify-center items-center p-8 text-center">
                        <h1 className="text-6xl text-primary mb-4"><GoLaw /></h1>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Law</h2>
                        <p className="text-gray-600 mb-6">Access scholarships for law students.</p>
                        <div className="mt-4">
                            <button className="bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-dark transition-all flex items-center gap-2">
                                Go <FaArrowAltCircleRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Science Card */}
                <div className="bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col justify-center items-center p-8 text-center">
                        <h1 className="text-6xl text-primary mb-4"><MdScience /></h1>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Science</h2>
                        <p className="text-gray-600 mb-6">Explore scholarships in various scientific fields.</p>
                        <div className="mt-4">
                            <button className="bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-dark transition-all flex items-center gap-2">
                                Go <FaArrowAltCircleRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipCategories;
