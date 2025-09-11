import { useState, useEffect } from "react";

const icons = {
  info: (
    <svg
      className="w-5 h-5 mr-2 text-blue-700"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 8h2v6H9V8zm0-4h2v2H9V4z" />
    </svg>
  ),
  success: (
    <svg
      className="w-5 h-5 mr-2 text-green-700"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707l-4 4a1 1 0 01-1.414 0l-2-2 1.414-1.414L9 10.586l3.293-3.293 1.414 1.414z" />
    </svg>
  ),
  warning: (
    <svg
      className="w-5 h-5 mr-2 text-yellow-700"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.764-1.36 2.722-1.36 3.486 0l6.518 11.614A1.75 1.75 0 0116.682 17H3.318a1.75 1.75 0 01-1.579-2.287L8.257 3.1zM10 12a1 1 0 100 2 1 1 0 000-2zm-1-5a1 1 0 112 0v3a1 1 0 11-2 0V7z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg
      className="w-5 h-5 mr-2 text-red-700"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.53-10.47a.75.75 0 00-1.06-1.06L10 8.94 7.53 6.47a.75.75 0 00-1.06 1.06L8.94 10l-2.47 2.47a.75.75 0 101.06 1.06L10 11.06l2.47 2.47a.75.75 0 101.06-1.06L11.06 10l2.47-2.47z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const bgColors = {
  info: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

const AlertMessage = ({ type = "info", message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 top-[100px] px-4 py-3 rounded-md shadow-md w-[90%] max-w-md ${
        bgColors[type] || bgColors["neutral"]
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icons[type] || icons["info"]}
          <span className="text-sm font-medium">{message}</span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-xl font-bold text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default AlertMessage;
