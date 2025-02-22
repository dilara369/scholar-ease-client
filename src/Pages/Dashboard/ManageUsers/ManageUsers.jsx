import { toast } from 'react-toastify';
import useUser from '../../../Hooks/useUser';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageUsers = () => {
    const [users, refetch] = useUser();
    const axiosSecure = useAxiosSecure();

    const handleRoleChange = (e, id) => {
        try {
            const userInfo = { role: e.target.value, id };
            axiosSecure.patch('/user', userInfo)
                .then(res => {
                    if (res.data.matchedCount > 0) {
                        refetch();
                        toast.success(`${e.target.value} is successfully updated.`);
                    }
                });

        } catch (err) {
            toast.error('Error changing role.');
        }
    };

    const handleDeleteUser = async (_id) => {
        try {
            await axiosSecure.delete(`/user/${_id}`)
                .then(res => {
                    if (res.data.deletedCount) {
                        toast.success('User deleted successfully', {
                            autoClose: 2000,
                            theme: 'colored',
                            position: 'top-center'
                        });
                        refetch();
                    }
                });

        } catch (err) {
            toast.error(err.response?.data?.error || 'Error deleting user');
        }
    };

    return (
        <div className="py-8 px-4 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Total Users: {users?.length}</h1>
            
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-primary text-white text-left">
                            <th className="py-3 px-6">Image</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6 text-center">Role</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => (
                            <tr key={user._id} className="border-b transition-all hover:bg-gray-100">
                                <td className="py-4 px-6 flex justify-start">
                                    <img
                                        src={user?.user_img}
                                        alt="User"
                                        className="h-12 w-12 object-cover rounded-full bg-gray-200"
                                    />
                                </td>
                                <td className="py-4 px-6 text-gray-700">{user?.user_name}</td>
                                <td className="py-4 px-6 text-gray-600">{user?.user_email}</td>
                                <td className="py-4 px-6 text-center">
                                    <select
                                        onChange={(e) => handleRoleChange(e, user._id)}
                                        defaultValue={user?.user_role}
                                        className={`p-2 rounded ${user.user_role === 'Admin' ? 'bg-orange-400' : user.user_role === 'Modaretor' ? 'bg-cyan-500' : 'bg-secondary'} text-background`}
                                    >
                                        <option disabled>{user?.user_role || 'Select Role'}</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Modaretor">Modaretor</option>
                                        <option value="user">User</option>
                                    </select>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {user.user_role !== 'Admin' && (
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
