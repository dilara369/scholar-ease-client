import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto">
                <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-pulse">
                    404
                </div>
                <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                    Oops! Page not found.
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    The page you are looking for might have been removed, had its name
                    changed, or is temporarily unavailable.
                </p>
                <Link
                    to="/"
                    className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-110 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600"
                >
                    Go back to Homepage
                </Link>
            </div>
        </div>
    );
};
export default NotFoundPage;
