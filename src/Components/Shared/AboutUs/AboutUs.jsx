import { FaArrowAltCircleRight } from "react-icons/fa";

const AboutUs = () => {
    return (
        <div className="w-11/12 mx-auto my-32 px-4 lg:px-0">
            <div className="lg:flex items-center justify-between gap-12">
                {/* Text Section */}
                <div className="flex-1 lg:order-1">
                    <div className="text-left">
                        <h1 className="text-4xl lg:text-5xl font-semibold text-primary mb-6">Our Professional Team Members</h1>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Our team is composed of passionate, highly skilled professionals dedicated to excellence in every aspect of their work. With expertise spanning diverse fields, our members bring years of experience, innovative thinking, and a shared commitment to achieving outstanding results. Together, we foster a collaborative environment where creativity thrives, challenges are embraced, and goals are consistently exceeded. Each team member plays a pivotal role in ensuring that we deliver unparalleled quality and value, making us a trusted choice for our clients and partners.
                        </p>
                        <div>
                            <button className="bg-secondary text-white py-2 px-6 rounded-full shadow-lg hover:bg-secondary-dark transition-all duration-500 flex items-center gap-2">
                                About Us More <FaArrowAltCircleRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex-1 lg:order-2 grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-full shadow-xl transform hover:scale-110 transition-all duration-500">
                        <img className="w-28 h-28object-cover rounded-full" src="https://i.ibb.co.com/pR8Fyy1/group-of-happy-students-and-their-teacher-using-laptop-during-a-class-at-the-university-jpg-s1024x10.jpg" alt="Students" />
                    </div>
                    <div className="overflow-hidden rounded-full shadow-xl transform hover:scale-110 transition-all duration-500">
                        <img className="w-28 h-28object-cover rounded-full" src="https://i.ibb.co.com/0nWCqXg/employees-using-laptop-800x450.jpg" alt="Employees" />
                    </div>
                    <div className="overflow-hidden rounded-full shadow-xl transform hover:scale-110 transition-all duration-500">
                        <img className="w-28 h-28object-cover rounded-full" src="https://i.ibb.co.com/Jc2qpw4/woman-in-wheelchair-working-800x450.jpg" alt="Woman in Wheelchair" />
                    </div>
                    <div className="overflow-hidden rounded-full shadow-xl transform hover:scale-110 transition-all duration-500 col-span-2">
                        <img className="w-28 h-28object-cover rounded-full" src="https://i.ibb.co.com/nz45cVG/recalibrating-career-services-understanding-of-and-approach-to-helping-todays-students-xlarge.png" alt="Career Services" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
