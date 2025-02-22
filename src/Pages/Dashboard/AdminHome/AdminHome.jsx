import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import { Cell, PieChart, Pie, Tooltip, Legend } from 'recharts';
import { useQuery } from "@tanstack/react-query";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const AdminHome = () => {
    const { user } = useAuth();
    const [isRole] = useRole();
    const axiosSecure = useAxiosSecure();
    
    const { data: stats = {}, isLoading, error } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });
    
    const pieChartData = Object.entries(stats).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value,
    }));

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 mb-10">
                <h1 className="text-4xl font-semibold text-primary text-center mb-6">
                    Welcome to the {isRole.role} Dashboard
                </h1>
                
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary mb-4">
                        <img className="h-full w-full object-cover" src={user?.photoURL} alt="User Profile" />
                    </div>
                    <h2 className="text-2xl font-medium text-gray-800">{user?.displayName}</h2>
                    <p className="text-lg text-gray-600">{user?.email}</p>
                    <div className="mt-4">
                        <span className="px-4 py-2 bg-primary text-white rounded-full">
                            {isRole?.role}
                        </span>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="flex justify-center items-center">
                    <div className="w-full md:w-2/3">
                        <PieChart width={350} height={350}>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="vertical" align="right" verticalAlign="middle" />
                        </PieChart>
                    </div>
                </div>
            </div>

            {/* Error Handling */}
            {error && (
                <div className="bg-red-500 text-white py-3 px-6 rounded-md shadow-md mb-4">
                    <p>Error loading stats: {error.message}</p>
                </div>
            )}
        </div>
    );
};

export default AdminHome;
