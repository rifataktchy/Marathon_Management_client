import { useNavigate } from "react-router-dom";

const NotFoundRedirect = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-6">
                Oops! The page you are looking for doesn't exist.
            </p>
            <button
                onClick={handleGoHome}
                className="btn btn-primary px-6 py-2 text-white rounded shadow"
            >
                Back to Home
            </button>
        </div>
    );
};

export default NotFoundRedirect;