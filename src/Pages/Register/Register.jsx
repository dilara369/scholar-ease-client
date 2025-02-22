import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
    const { user, createUser, googleLogin, updateUserProfile } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleRegisterBtn = e => {
        e.preventDefault();
        const form = new FormData(e.target)
        const userInfo = Object.fromEntries(form.entries())
        if (userInfo.password.length < 6) {
            return toast.error("Password must be less than 6 characters.");
        } else if (!/[A-Z]/.test(userInfo.password)) {
            return toast.error("Password should not contain capital letters.");
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(userInfo.password)) {
            return toast.error("Password should not contain special characters like @, #, or $.");
        }

        createUser(userInfo.email, userInfo.password)
            .then((res) => {
                // update user name and phot url
                updateUserProfile(userInfo.name, userInfo.photo)
                    .then(async (res) => {
                        // create a new profile api in mongoDB
                        const userData = {
                            user_name: userInfo?.name,
                            user_email: userInfo?.email,
                            user_img: userInfo?.photo,
                            user_password: userInfo?.password
                        }
                        const resulst = await axiosPublic.post('/user', userData)

                        if (resulst.data.insertedId) {
                            toast.success('Register successfully', {
                                position: 'top-center',
                                hideProgressBar: true,
                                autoClose: 2000,
                                theme: 'colored',
                            })
                            navigate('/')
                        }
                    })
                    .catch(() => {

                    })

            })
            .catch(err => {
                toast.error(`${err.code.split('/')[1].split('-').join(' ')}`, {
                    position: 'top-center',
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: 'colored',

                })
            })
    }
    const handleGoogleBtn = () => {
        googleLogin()
            .then(async (res) => {
                const resulst = await axiosPublic.post('/user', {
                    user_name: res?.user?.displayName,
                    user_email: res?.user?.email,
                    user_img: res?.user?.photoURL
                })
                if (resulst.data.insertedId) {
                    toast.success('Register with google successful', {
                        position: 'top-center',
                        hideProgressBar: true,
                        autoClose: 2000,
                        theme: 'colored',
                    })
                    navigate('/')
                }
            })
            .catch(err => {
                toast.error(`${err.code.split('/')[1].split('-').join(' ')}`, {
                    position: 'top-center',
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: 'colored',

                })
            })
    }
    return (
        <div>
            <div className="z-50">
                <ToastContainer />
            </div>
            <div className="bg-[url('https://i.ibb.co.com/0nWCqXg/employees-using-laptop-800x450.jpg')]  bg-cover ">
                <div className="backdrop-blur-md bg-black/25 min-h-[100vh] flex justify-center">
                    <div className="mt-40 border h-fit p-10 rounded-md shadow-2xl  bg-white/20">
                        <h1 className="font-bold text-6xl text-white  text-center mb-9">Register</h1>
                        <form
                            onSubmit={handleRegisterBtn}
                            className="flex flex-col">
                            <input
                                type="text"
                                name="name"
                                className="py-3 pl-4 pr-7   rounded-full mt-5 bg-transparent border-2 text-white"
                                placeholder="Username" />
                            <input
                                type="text"
                                name="photo"
                                className="py-3 pl-4 pr-7   rounded-full mt-5 bg-transparent border-2 text-white"
                                placeholder="PhotoURL" />
                            <input
                                type="email"
                                name="email"
                                className="py-3 pl-4 pr-7   rounded-full mt-5 bg-transparent border-2 text-white"
                                placeholder="Email" />
                            <input
                                type="text"
                                name="password"
                                className="py-3 pl-4 pr-7  rounded-full mt-5 bg-transparent border-2 text-white"
                                placeholder="Password" />
                            <button className="py-2 px-10  font-medium text-lg rounded-full mt-9 text-white bg-secondary hover:shadow-2xl hover:scale-110 duration-500">register</button>
                        </form>
                        <hr className="mt-5" />
                        <div className="flex justify-evenly gap-5 mt-5">
                            <button
                                onClick={handleGoogleBtn}
                            ><img className="w-12 hover:shadow-2xl hover:scale-110 duration-500 rounded-full" src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="" /></button>
                            <button

                            ><img className="w-12 hover:shadow-2xl hover:scale-110 duration-500 rounded-full" src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000" alt="" /></button>

                        </div>
                        <p className="text-white  w-fit mt-4">You have an account Go To <Link to={'/login'}><span className="border-b"> Login</span></Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;