import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const ModaretoHome = () => {
    const { user } = useAuth();
    const [isRole] = useRole();

    
    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-semibold text-primary text-center mb-6">
                    Welcome to {isRole.role} Profile
                </h1>

                <div className="flex justify-center mb-6">
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-primary">
                        <img className="h-full w-full object-cover" src={user?.photoURL} alt="User Profile" />
                    </div>
                </div>

                <div className="text-center">
                    <h1 className="text-xl font-semibold text-gray-700 mb-2">{user?.displayName}</h1>
                    <p className="text-lg text-gray-500 mb-4">{user?.email}</p>

                    <div className="bg-primary/10 inline-block px-4 py-2 rounded-full">
                        <p className="text-sm font-medium text-primary">{isRole?.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModaretoHome;
