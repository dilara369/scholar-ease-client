import useAuth from "../../../Hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg text-center relative">
                <h1 className="text-4xl font-bold text-blue-600">Welcome to Profile</h1>
                <div className="mt-8">
                    <div className="w-40 h-40 rounded-full mx-auto overflow-hidden border-4 border-blue-500 shadow-lg">
                        <img 
                            className="w-full h-full object-cover" 
                            src={user?.photoURL || "https://via.placeholder.com/150"} 
                            alt="Profile" 
                        />
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                        <h1 className="text-2xl font-semibold text-gray-800">{user?.displayName || "No Name"}</h1>
                        <h1 className="text-xl text-gray-600">{user?.email || "No Email"}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
