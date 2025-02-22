const FancySpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
            {/* Spinner */}
            <div className="relative w-20 h-20">
                {/* Outer Ring */}
                <div className="absolute w-full h-full border-4 border-transparent border-t-green-500 border-b-green-500 rounded-full animate-spin"></div>
                {/* Central Circle */}
                <div className="absolute w-8 h-8 top-7 left-6 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
            {/* Loading Text */}
            <p className="text-xl font-semibold text-gray-700">
                Loading<span className="animate-pulse">...</span>
            </p>
        </div>

    );
};

export default FancySpinner;
