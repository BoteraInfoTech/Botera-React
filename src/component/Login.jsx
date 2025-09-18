import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Button from "./commonComponents/Button";
import TextBox from "./commonComponents/TextBox";
import SideImage from "./commonComponents/SideImage";
import logo from "../logo.png";
import AlertMessage from "./commonComponents/AlertMessage";
import CheckBox from "./commonComponents/CheckBox";

export default function UsernameLoginPage({ loginAction, authDetails }) {
  const { isLoading, errorMessage, successMessage } = authDetails;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (successMessage) {
      navigate("/dashboard");
    }
  }, [successMessage, navigate]);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCredentials({ ...credentials, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!credentials.email.trim()) newErrors.email = "Username is required";
    if (!credentials.password.trim())
      newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      loginAction(credentials);
    }
  };

  return (
    <>
      {errorMessage && <AlertMessage type="error" message={errorMessage} />}
      <div className="flex flex-col md:flex-row min-h-screen bg-white">
        <SideImage />
        <div className="flex flex-col justify-center px-6 md:px-20 py-10 md:py-16 w-full md:w-1/2 bg-white shadow-lg md:shadow-none">
          <div className="max-w-md w-full mx-auto">
            <img
              src={logo}
              alt="Botera Logo"
              className="w-32 mb-6 md:mx-0 mx-auto"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">
              Welcome back again
            </h2>

            <div className="space-y-5 ">
              <TextBox
                label="Username"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={handleChange("email")}
                error={errors.email}
                className="w-full"
                isFullWidth
              />
              <TextBox
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange("password")}
                error={errors.password}
                className="w-full"
                isFullWidth
              />

              <CheckBox
                label="Remember me"
                checked={credentials.remember}
                handleChange={handleChange("remember")}
              />

              <Button
                text="Sign In"
                onClick={handleSubmit}
                className="w-full bg-navyBlue text-white"
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              />

              <p className="text-center text-sm text-gray-500 mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
