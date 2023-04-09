import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
      <div className="max-w-md w-full py-12 px-6 space-y-8 bg-white shadow-xl rounded-xl">
        <h2 className="text-yellow-400 text-3xl font-bold">404</h2>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Page Not Found</h3>
          <p className="text-gray-600">
            The page you're looking for does not seem to exist.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="text-white bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-full"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
