import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { motion } from "framer-motion"; // Correcting import
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="relative w-full">
            <Swiper
                scrollbar={{
                    hide: true,
                }}
                modules={[Scrollbar]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative h-[90vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="relative z-10 flex items-center justify-between p-10 lg:p-20">
                            <div className="text-white space-y-6 max-w-xl">
                                <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
                                    Scholarship Navigator Platform
                                </h1>
                                <p className="text-xl lg:text-2xl">
                                    Find your best scholarship opportunities and navigate your way to a brighter future.
                                </p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        to="/scholarships"
                                        className="bg-secondary text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:bg-secondary/80 transition duration-300"
                                    >
                                        Explore Scholarships
                                    </Link>
                                </motion.div>
                            </div>
                            <motion.div
                                className="flex-1"
                                whileInView={{ scale: [1, 0.95, 1] }}
                                transition={{ delay: 0.5, duration: 1 }}
                                animate={{ y: [0, 20, 0] }}
                            >
                                <img
                                    className="w-full max-h-[80vh] rounded-xl object-cover"
                                    src="https://i.ibb.co/M1QT7LY/prsentSm.png"
                                    alt="Scholarship"
                                />
                            </motion.div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative h-[85vh] bg-gradient-to-r from-gray-700 to-black">
                        <div className="absolute inset-0 bg-black/40"></div>
                        <img
                            className="w-full h-full object-cover"
                            src="https://i.ibb.co/0nWCqXg/employees-using-laptop-800x450.jpg"
                            alt="Laptop Work"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative h-[85vh] bg-gradient-to-r from-green-500 to-blue-500">
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="relative z-10 flex items-center justify-center text-center text-white px-10 py-20">
                            <div>
                                <h1 className="text-5xl font-bold leading-tight lg:text-7xl mb-6">
                                    Empowering You with Education
                                </h1>
                                <p className="text-lg lg:text-xl mb-8">
                                    Whether you're looking for a full scholarship or financial aid, we have it all.
                                </p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        to="/apply"
                                        className="bg-secondary text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:bg-secondary/80 transition duration-300 "
                                    >
                                        Apply Now
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
