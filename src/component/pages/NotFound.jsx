import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800 px-4 text-center">
      {/* 404 Illustration */}
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* Browser Window */}
        <div className="relative w-28 h-20 border border-sky-300 rounded-md bg-white flex flex-col items-center shadow-sm">
          {/* Top Bar */}
          <div className="w-full h-4 bg-sky-100 rounded-t-md flex items-center px-1 gap-1">
            <span className="w-1.5 h-1.5 bg-sky-300 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-sky-300 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-sky-300 rounded-full"></span>
          </div>
          {/* Face */}
          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>
          {/* Mouth */}
          <div className="absolute bottom-3 w-4 h-2 rounded-b-full bg-gray-500"></div>
          {/* Cheeks */}
          <div className="absolute left-2 bottom-4 w-2 h-2 bg-pink-300 rounded-full opacity-80"></div>
          <div className="absolute right-2 bottom-4 w-2 h-2 bg-pink-300 rounded-full opacity-80"></div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-sky-500 mt-4">
          404
        </h1>
      </div>

      {/* Message */}
      <p className="text-lg md:text-xl text-gray-600 mt-6 animate-fade-in">
        Oops! The page you are looking for cannot be found.
      </p>
      <p className="text-sm md:text-base text-gray-500 mt-1 animate-fade-in">
        It might have been removed, renamed, or is temporarily unavailable.
      </p>
      <Link
        to="/login"
        className="mt-6 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all animate-fade-in"
      >
        Back to Home
      </Link>
    </div>
  );
}
