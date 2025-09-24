import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import SideImage from "./commonComponents/SideImage";
import Button from "./commonComponents/Button";
import TextBox from "./commonComponents/TextBox";
import Dropdown from "./commonComponents/Dropdown";
import AlertMessage from "./commonComponents/AlertMessage";
import logo from "../logo.png";

const SignUp = ({ registerUser, authDetails }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
    businessSize: "small",
    password: "",
    remember: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const [errors, setErrors] = useState({});
  const [disableSignUp, setDisableSignUp] = useState(true);

  const navigate = useNavigate();
  const { isLoading, errorMessage, successMessage } = authDetails;

  useEffect(() => {
    if (successMessage) {
      navigate("/dashboard");
    }
  }, [successMessage, navigate]);

  const handleInputChange = (field) => (e) => {
    const value =
      e.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  // ✅ wrapped in useCallback to avoid ESLint warnings
  const validate = useCallback(
    (field, from) => {
      const newErrors = { ...errors };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

      switch (field) {
        case "email": {
          if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email address";
          }
          break;
        }
        case "password": {
          if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be strong.";
          }
          break;
        }
        default:
          break;
      }

      Object.keys(newErrors).forEach((key) => {
        if (newErrors[key] === "") {
          delete newErrors[key];
        }
      });

      if (Object.keys(newErrors).length && from !== "checkButtonStatus") {
        setErrors(newErrors);
      }
      return !Object.keys(newErrors).length;
    },
    [formData, errors] // ✅ dependencies
  );

  useEffect(() => {
    if (formData.email && formData.password) {
      if (
        validate("email", "checkButtonStatus") &&
        validate("password", "checkButtonStatus")
      ) {
        setDisableSignUp(false);
      } else {
        setDisableSignUp(true);
      }
    } else {
      setDisableSignUp(true);
    }
  }, [formData, validate]);

  const handleDropdownChange = (value) => {
    setFormData({ ...formData, businessSize: value });
  };

  const handleOnBlur = (field) => () => {
    validate(field);
  };

  const handleSubmit = () => {
    if (validate()) {
      registerUser(formData);
    }
  };

  return (
    <>
      {errorMessage && <AlertMessage type="error" message={errorMessage} />}
      <div className="flex flex-col md:flex-row min-h-screen bg-white">
        <SideImage />
        <div className="flex flex-col justify-center px-6 md:px-20 py-10 md:py-16 w-full md:w-1/2 bg-white shadow-lg md:shadow-none">
          <img
            src={logo}
            alt="Botera Logo"
            className="w-32 mb-6 md:mx-0 mx-auto"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">
            Join us and grow fast
          </h2>

          <div className="flex flex-wrap gap-4 mb-5 w-full">
            <TextBox
              label="First Name"
              value={formData.firstName}
              placeholder="John"
              className="w-full"
              onChange={handleInputChange("firstName")}
            />
            <TextBox
              label="Phone Number"
              value={formData.phone}
              placeholder="+1 (555) 555-1234"
              className="w-full"
              onChange={handleInputChange("phone")}
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-5 w-full">
            <TextBox
              label="Work Email"
              value={formData.email}
              placeholder="you@company.com"
              type="email"
              required
              onChange={handleInputChange("email")}
              error={errors.email}
              handleOnBlur={handleOnBlur("email")}
            />
            <TextBox
              label="Password"
              value={formData.password}
              placeholder="Choose a strong password"
              type="password"
              required
              onChange={handleInputChange("password")}
              error={errors.password}
              handleOnBlur={handleOnBlur("password")}
            />
          </div>

          <div className="space-y-5">
            <Dropdown
              label="Size of business"
              value={formData.businessSize}
              options={[
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
              ]}
              onChange={handleDropdownChange}
            />

            <p className="text-sm text-gray-500 mb-6">
              <span className="text-red-500">*</span> indicates required field
            </p>

            <Button
              text="Sign Up"
              className="w-full bg-navyBlue text-white"
              onClick={handleSubmit}
              disabled={disableSignUp || isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            />

            <p className="text-sm text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
