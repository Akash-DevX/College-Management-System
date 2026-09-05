import React, { useState, useEffect } from "react";
import {
  FiLogIn,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiBookOpen,
  FiUsers,
  FiUserCheck,
} from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setUserToken } from "../redux/actions";
import { useDispatch } from "react-redux";
import CustomButton from "../components/CustomButton";
import axiosWrapper from "../utils/AxiosWrapper";

const USER_TYPES = {
  STUDENT: "Student",
  FACULTY: "Faculty",
  ADMIN: "Admin",
};

/* -------------------------------------------------------
   Role Configuration
------------------------------------------------------- */

const ROLE_CONFIG = {
  Student: {
    icon: FiBookOpen,
    title: "Student Portal",
    description: "Access your academic journey",
    color: "blue",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
    lightBg: "bg-blue-50",
    text: "text-blue-600",
  },
  Faculty: {
    icon: FiUsers,
    title: "Faculty Portal",
    description: "Manage your academic activities",
    color: "violet",
    bg: "bg-violet-600",
    hover: "hover:bg-violet-700",
    lightBg: "bg-violet-50",
    text: "text-violet-600",
  },
  Admin: {
    icon: FiShield,
    title: "Admin Portal",
    description: "Manage your college system",
    color: "emerald",
    bg: "bg-emerald-600",
    hover: "hover:bg-emerald-700",
    lightBg: "bg-emerald-50",
    text: "text-emerald-600",
  },
};

/* -------------------------------------------------------
   User Type Selector
------------------------------------------------------- */

const UserTypeSelector = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-1.5 bg-gray-100 rounded-xl mb-7">
      {Object.values(USER_TYPES).map((type) => {
        const config = ROLE_CONFIG[type];
        const Icon = config.icon;

        return (
          <button
            key={type}
            type="button"
            onClick={() => onSelect(type)}
            className={`flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              selected === type
                ? `${config.bg} text-white shadow-md`
                : "text-gray-600 hover:bg-white hover:text-gray-900"
            }`}
          >
            <Icon className="text-base" />
            <span>{type}</span>
          </button>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------
   Login Form
------------------------------------------------------- */

const LoginForm = ({
  selected,
  onSubmit,
  formData,
  setFormData,
  loading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const config = ROLE_CONFIG[selected];
  const ButtonIcon = config.icon;

  const emailPlaceholder =
    selected === "Student"
      ? "Enter student email"
      : selected === "Faculty"
      ? "Enter faculty email"
      : "Enter admin email";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {selected} Email
        </label>

        <div className="relative">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          <input
            type="email"
            id="email"
            required
            autoComplete="email"
            placeholder={emailPlaceholder}
            className={`w-full pl-11 pr-4 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl
              text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-${config.color}-500 focus:border-transparent
              focus:bg-white transition-all duration-200`}
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700"
          >
            Password
          </label>

          <Link
            to="/forget-password"
            className={`text-xs font-semibold ${config.text} hover:underline`}
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          <input
            type={showPassword ? "text" : "password"}
            id="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className="w-full pl-11 pr-12 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl
              text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              focus:bg-white transition-all duration-200"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FiEyeOff className="text-lg" />
            ) : (
              <FiEye className="text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* Login Button */}
      <CustomButton
        type="submit"
        disabled={loading}
        className={`w-full ${config.bg} ${config.hover} text-white font-semibold py-3.5 px-4 rounded-xl
          transition-all duration-200 flex justify-center items-center gap-2
          shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Signing in...
          </>
        ) : (
          <>
            Login
            <FiLogIn className="text-lg" />
          </>
        )}
      </CustomButton>

      {/* Security message */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-1">
        <FiShield />
        <span>Your account is protected with secure authentication</span>
      </div>
    </form>
  );
};

/* -------------------------------------------------------
   Main Login Component
------------------------------------------------------- */

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [selected, setSelected] = useState(USER_TYPES.STUDENT);
  const [loading, setLoading] = useState(false);

  /* -------------------------------------------------------
     User Type Selection
  ------------------------------------------------------- */

  const handleUserTypeSelect = (type) => {
    const userType = type.toLowerCase();

    setSelected(type);
    setSearchParams({ type: userType });

    // Clear password when switching account type
    setFormData((prev) => ({
      ...prev,
      password: "",
    }));
  };

  /* -------------------------------------------------------
     Login Submit
  ------------------------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosWrapper.post(
        `/${selected.toLowerCase()}/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data.data;

      localStorage.setItem("userToken", token);
      localStorage.setItem("userType", selected);

      dispatch(setUserToken(token));

      toast.success(`Welcome to the ${selected} Portal!`);

      setTimeout(() => {
        navigate(`/${selected.toLowerCase()}`);
      }, 500);
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------
     Existing Login Check
  ------------------------------------------------------- */

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const userType = localStorage.getItem("userType");

    if (userToken && userType) {
      navigate(`/${userType.toLowerCase()}`);
    }
  }, [navigate]);

  /* -------------------------------------------------------
     URL Type Handling
  ------------------------------------------------------- */

  useEffect(() => {
    if (type) {
      const capitalizedType =
        type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

      if (USER_TYPES && Object.values(USER_TYPES).includes(capitalizedType)) {
        setSelected(capitalizedType);
      }
    }
  }, [type]);

  const config = ROLE_CONFIG[selected];
  const SelectedIcon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">

      {/* Main Container */}
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

        {/* -------------------------------------------------
            Left Branding Section
        ------------------------------------------------- */}

        <div className="hidden lg:flex relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 text-white flex-col justify-between overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 right-10 w-24 h-24 bg-white/5 rounded-full"></div>

          <div className="relative z-10">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <FiBookOpen className="text-2xl" />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-wide">
                  College ERP
                </h2>
                <p className="text-xs text-blue-100">
                  Management System
                </p>
              </div>
            </div>

            {/* Heading */}
            <div>
              <p className="text-blue-100 text-sm font-medium mb-3">
                WELCOME BACK 👋
              </p>

              <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-5">
                Manage your
                <br />
                college smarter.
              </h1>

              <p className="text-blue-100 text-sm leading-6 max-w-md">
                A centralized platform for students, faculty and administrators
                to manage academic activities efficiently.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="relative z-10 space-y-4">

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <FiUserCheck />
              </div>
              <span className="text-sm text-blue-50">
                Student & Faculty Management
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <FiBookOpen />
              </div>
              <span className="text-sm text-blue-50">
                Academic & Course Management
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <FiShield />
              </div>
              <span className="text-sm text-blue-50">
                Secure Role-Based Access
              </span>
            </div>

          </div>
        </div>

        {/* -------------------------------------------------
            Right Login Section
        ------------------------------------------------- */}

        <div className="p-6 sm:p-10 lg:p-12">

          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <FiBookOpen className="text-xl" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                College ERP
              </h2>
              <p className="text-xs text-gray-500">
                Management System
              </p>
            </div>
          </div>

          {/* Login Heading */}
          <div className="text-center mb-7">

            <div
              className={`mx-auto mb-4 w-14 h-14 ${config.lightBg} ${config.text} rounded-2xl flex items-center justify-center`}
            >
              <SelectedIcon className="text-2xl" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {config.title}
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              {config.description}
            </p>
          </div>

          {/* User Type Tabs */}
          <UserTypeSelector
            selected={selected}
            onSelect={handleUserTypeSelect}
          />

          {/* Login Form */}
          <LoginForm
            selected={selected}
            onSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
          />

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-7">
            © {new Date().getFullYear()} College ERP. All rights reserved.
          </p>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default Login;