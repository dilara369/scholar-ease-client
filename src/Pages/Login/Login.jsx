import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
    const { loginUser, googleLogin } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLoginBtn = e => {
        e.preventDefault();
        const form = new FormData(e.target)
        const userInfo = Object.fromEntries(form.entries())
        loginUser(userInfo.email, userInfo.password)
            .then(res => {
                toast.success('Login successful', {
                    position: 'top-center',
                    hideProgressBar: true,
                    autoClose: 2000,
                    theme: 'colored',
                })
                navigate(location?.state?.pathname || '/')
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
                // const resulst = await axiosPublic.post('/user', {
                //     user_name: res?.user?.displayName,
                //     user_email: res?.user?.email,
                //     user_img: res?.user?.photoURL
                // })
                // if (resulst.data.insertedId) {
                //     toast.success('Register with google successful', {
                //         position: 'top-center',
                //         hideProgressBar: true,
                //         autoClose: 2000,
                //         theme: 'colored',
                //     })

                // }
                navigate(location?.state?.pathname || '/')
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
            <ToastContainer />
            <div>
                <div className="bg-[url('https://i.ibb.co.com/pR8Fyy1/group-of-happy-students-and-their-teacher-using-laptop-during-a-class-at-the-university-jpg-s1024x10.jpg')]  bg-cover ">
                    <div className="backdrop-blur-md bg-black/25 min-h-[100vh] flex justify-center">
                        <div className="mt-40 border h-fit p-10 rounded-md shadow-2xl  bg-white/20">
                            <h1 className="font-bold text-6xl text-white  text-center mb-9">Login</h1>
                            <form
                                onSubmit={handleLoginBtn}
                                className="flex flex-col">

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
                                <button className="py-2 px-10  font-medium text-lg rounded-full mt-9 text-white bg-secondary hover:shadow-2xl hover:scale-110 duration-500">Sign In</button>
                            </form>
                            <hr className="mt-5" />
                            <div className="flex justify-evenly gap-5 mt-5">
                                <button
                                    onClick={handleGoogleBtn}
                                ><img className="w-12 hover:shadow-2xl hover:scale-110 duration-500 rounded-full" src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="" /></button>
                                <button

                                ><img className="w-12 hover:shadow-2xl hover:scale-110 duration-500 rounded-full" src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000" alt="" /></button>

                            </div>
                            <p className="text-white  w-fit mt-4">You have don't account Go To <Link to={'/register'}><span className="border-b"> Register</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;