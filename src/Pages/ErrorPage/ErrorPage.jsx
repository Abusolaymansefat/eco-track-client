import { Link } from "react-router";
import errorImg from "../../assets/error/error-1.png";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
      <img
        src={errorImg}
        alt="404 Not Found"
        className="max-w-sm w-full mb-6"
      />
      <h1 className="text-3xl font-bold text-red-500 mb-2">Oops! Page Not Found</h1>
      <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
