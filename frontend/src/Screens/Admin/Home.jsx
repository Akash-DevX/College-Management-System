import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import Notice from "../Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import Admin from "./Admin";
import Branch from "./Branch";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
import axiosWrapper from "../../utils/AxiosWrapper";
import Profile from "./Profile";
import Exam from "../Exam";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiGitBranch,
  FiBell,
  FiBookOpen,
  FiBook,
  FiShield,
  FiChevronRight,
  FiMenu,
} from "react-icons/fi";

const MENU_ITEMS = [
  {
    id: "home",
    label: "Home",
    description: "Admin profile",
    component: Profile,
    icon: FiHome,
  },
  {
    id: "student",
    label: "Students",
    description: "Manage students",
    component: Student,
    icon: FiUsers,
  },
  {
    id: "faculty",
    label: "Faculty",
    description: "Manage faculty",
    component: Faculty,
    icon: FiUserCheck,
  },
  {
    id: "branch",
    label: "Branches",
    description: "Manage branches",
    component: Branch,
    icon: FiGitBranch,
  },
  {
    id: "notice",
    label: "Notices",
    description: "College notices",
    component: Notice,
    icon: FiBell,
  },
  {
    id: "exam",
    label: "Exams",
    description: "Manage examinations",
    component: Exam,
    icon: FiBookOpen,
  },
  {
    id: "subjects",
    label: "Subjects",
    description: "Manage subjects",
    component: Subjects,
    icon: FiBook,
  },
  {
    id: "admin",
    label: "Admins",
    description: "Manage administrators",
    component: Admin,
    icon: FiShield,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");

  const fetchUserDetails = async () => {
    setIsLoading(true);

    try {
      const response = await axiosWrapper.get("/admin/my-details", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.data.success) {
        setProfileData(response.data.data);
        dispatch(setUserData(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Admin details error:", error);
      toast.error(
        error.response?.data?.message || "Error fetching user details"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchUserDetails();
    }
  }, [dispatch, userToken]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pathMenuId = urlParams.get("page") || "home";
    const validMenu = MENU_ITEMS.find((item) => item.id === pathMenuId);
    setSelectedMenu(validMenu ? validMenu.id : "home");
  }, [location.search]);

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    setMobileMenuOpen(false);
    navigate(`/admin?page=${menuId}`);
  };

  const currentMenu =
    MENU_ITEMS.find((item) => item.id === selectedMenu) || MENU_ITEMS[0];

  const CurrentIcon = currentMenu.icon;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="min-h-[420px] flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading dashboard...
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Please wait a moment
          </p>
        </div>
      );
    }

    const MenuItem = currentMenu.component;

    if (selectedMenu === "home" && profileData) {
      return <Profile profileData={profileData} />;
    }

    return MenuItem ? <MenuItem /> : null;
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] bg-slate-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-7">
          <div className="lg:hidden mb-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <CurrentIcon className="text-lg" />
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {currentMenu.label}
                  </p>
                  <p className="text-xs text-gray-400">
                    {currentMenu.description}
                  </p>
                </div>
              </div>

              <FiMenu className="text-xl text-gray-500" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside
              className={`${
                mobileMenuOpen ? "block" : "hidden"
              } lg:block w-full lg:w-64 xl:w-72 flex-shrink-0`}
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:sticky lg:top-5">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                      <FiShield className="text-xl" />
                    </div>

                    <div>
                      <h2 className="font-bold text-gray-900">
                        Admin Panel
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        College Management
                      </p>
                    </div>
                  </div>
                </div>

                <nav className="p-3">
                  <p className="px-3 pt-1 pb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Main Menu
                  </p>

                  <div className="space-y-1">
                    {MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isActive = selectedMenu === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleMenuClick(item.id)}
                          className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 ${
                            isActive
                              ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isActive
                                ? "bg-white/15 text-white"
                                : "bg-gray-50 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                            }`}
                          >
                            <Icon className="text-lg" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-semibold ${
                                isActive
                                  ? "text-white"
                                  : "text-gray-700"
                              }`}
                            >
                              {item.label}
                            </p>

                            <p
                              className={`text-[10px] mt-0.5 truncate ${
                                isActive
                                  ? "text-blue-100"
                                  : "text-gray-400"
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>

                          <FiChevronRight
                            className={`text-sm transition-transform ${
                              isActive
                                ? "text-white translate-x-0.5"
                                : "text-gray-300 group-hover:text-gray-500"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </nav>

                <div className="p-4 mt-2">
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                        <FiShield className="text-sm" />
                      </div>

                      <span className="text-xs font-bold text-blue-900">
                        Admin Access
                      </span>
                    </div>

                    <p className="text-[11px] leading-4 text-blue-700">
                      You have access to manage students, faculty,
                      academics and college administration.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <main className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 sm:px-6 py-5 mb-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex w-12 h-12 rounded-xl bg-blue-50 text-blue-600 items-center justify-center">
                      <CurrentIcon className="text-xl" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                          {currentMenu.label}
                        </h1>

                        <span className="hidden sm:inline-flex px-2 py-1 rounded-md bg-green-50 text-green-600 text-[10px] font-bold uppercase">
                          Active
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-1">
                        {currentMenu.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Admin</span>
                    <FiChevronRight />
                    <span className="font-semibold text-gray-600">
                      {currentMenu.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="min-w-0">{renderContent()}</div>
            </main>
          </div>
        </div>
      </div>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
};

export default Home;