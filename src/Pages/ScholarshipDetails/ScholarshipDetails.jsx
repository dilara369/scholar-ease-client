import { Link, useLoaderData } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";

const ScholarshipDetails = () => {
    const loaderData = useLoaderData()
    const {
        applicationDeadline,
        applicationFees,
        degree,
        postedUserEmail,
        scholarshipCategory,
        scholarshipName,
        serviceCharge,
        subjectCategory,
        tuitionFees,
        universityCity,
        universityCountry,
        universityImage,
        universityName,
        _id

    } = loaderData?.scholarship

    return (
        <div>
            <div className="w-11/12 mx-auto mt-20 lg:flex gap-20">
                <div className="">
                    <img className=" h-[60vh] rounded-md" src={universityImage} alt="" />
                </div>
                <div>
                    <div className={`flex `}>
                        <div className="">
                            <h1 className="text-4xl font-semibold ">{universityName}</h1>
                            <p className="mt-7 "><strong>Scholarship Name :</strong> <br /> {scholarshipName}</p>

                            <p className="mt-3"><strong>country :</strong> <br />{universityCity},{universityCountry}</p>

                            <p className="mt-3 "><strong>Scholarship category :</strong> <br /> {scholarshipCategory}</p>
                            <p className="mt-3"><strong>Subject name :</strong> <br /> {subjectCategory}</p>
                            <p className="mt-3"><strong>Service Charge :</strong> <br /> ${serviceCharge}</p>
                            <p className="mt-3"><strong>Application Deadline :</strong> <br /> {applicationDeadline}</p>
                            <p className="mt-3 "><strong>Scholarship Description : </strong> <br /> {'description'}</p>
                        </div>
                        <p className="text-[#d5a403] text-4xl font-semibold rounded-md  w-32"> Fees :<br /> $ {applicationFees}</p>
                    </div>
                    <div className=" mt-10">
                        <Link to={`/payment/${_id}`}>
                            <button
                                className="rounded-sm w-full text-center py-3 text-xl font-semibold bg-secondary hover:shadow-xl duration-300 hover:scale-105">Apply for the Scholarship</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-10/12 mx-auto mt-10">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 4,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Autoplay, Pagination]}
                    className="mySwiper"
                >

                    {loaderData?.reviwes?.map(review => <div key={review?._id}>
                        <SwiperSlide>
                            <div className={` rounded-md lex justify-center text-center  p-5 bg-[url('${review?.userImage}')] bg-cover bg-no-repeat `}>
                                <div >
                                    <div className="flex justify-center">
                                        <img className="w-40  h-40 object-cover rounded-full" src={review?.userImage
                                        } alt="" />
                                    </div>
                                    <h1 className="mt-2 font-semibold">{review?.userName}</h1>
                                    <h1>{review?.universityName}</h1>
                                    <h1 >{review?.scholarshipName}</h1>
                                    <h1 className="flex justify-center mt-2">
                                        <Rating style={{ maxWidth: 200, }} value={review?.rating} readOnly />
                                    </h1>
                                    <h1>{review?.comment}</h1>
                                    <h1>{review?.reviewDate}</h1>

                                </div>
                            </div>
                        </SwiperSlide>
                    </div>)}
                </Swiper>
            </div>
        </div>
    );
};

export default ScholarshipDetails;