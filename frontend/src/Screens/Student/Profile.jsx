import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiBook,
  FiHome,
  FiAlertCircle,
  FiLock,
  FiCheckCircle,
  FiHash,
  FiDroplet,
} from "react-icons/fi";
import { Toaster } from "react-hot-toast";
import CustomButton from "../../components/CustomButton";
import UpdatePasswordLoggedIn from "../../components/UpdatePasswordLoggedIn";

const Profile = ({ profileData }) => {
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);

  if (!profileData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Not available";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fullName =
    `${profileData.firstName || ""} ${profileData.middleName || ""} ${profileData.lastName || ""}`
      .replace(/\s+/g, " ")
      .trim();

  const mediaLink = process.env.REACT_APP_MEDIA_LINK;

  const profileImage = profileData.profile
    ? `${mediaLink}/${profileData.profile}`
    : null;

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    capitalize = false,
  }) => (
    <div className="group flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-all duration-200">
      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-white text-blue-600 flex items-center justify-center shadow-sm">
        <Icon className="text-lg" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400 mb-1">
          {label}
        </p>

        <p
          className={`text-sm font-semibold text-gray-800 break-words ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {value || "Not available"}
        </p>
      </div>
    </div>
  );

  const Section = ({ icon: Icon, title, children }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Icon className="text-lg" />
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            {title}
          </h2>

          <p className="text-xs text-gray-400">
            Your {title.toLowerCase()} details
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );

  return (
    <div className="w-full space-y-5">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 shadow-lg">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-white/10" />

        <div className="relative z-10 p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="relative flex-shrink-0">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white/80 shadow-xl"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white/15 border-4 border-white/50 flex items-center justify-center text-white">
                    <FiUser className="text-5xl" />
                  </div>
                )}

                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-green-500 border-4 border-blue-600 flex items-center justify-center text-white">
                  <FiCheckCircle className="text-sm" />
                </div>
              </div>

              <div className="text-white">
                <p className="text-xs font-semibold tracking-widest text-blue-100 uppercase mb-2">
                  Student Profile
                </p>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {fullName || "Student"}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-medium">
                    <FiHash />
                    {profileData.enrollmentNo || "N/A"}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-medium">
                    <FiBook />
                    {profileData.branchId?.name || "Branch"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-xs text-blue-100">
                  <span>
                    Semester:{" "}
                    <strong className="text-white">
                      {profileData.semester || "N/A"}
                    </strong>
                  </span>

                  <span className="hidden sm:inline">•</span>

                  <span>
                    Status:{" "}
                    <strong className="text-white capitalize">
                      {profileData.status || "Active"}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <CustomButton
                onClick={() => setShowPasswordUpdate(!showPasswordUpdate)}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-200 flex items-center justify-center gap-2 border border-blue-400/30"
              >
                <FiLock />
                {showPasswordUpdate ? "Hide" : "Update Password"}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <Section icon={FiUser} title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem
                icon={FiMail}
                label="Email"
                value={profileData.email}
              />

              <InfoItem
                icon={FiPhone}
                label="Phone"
                value={profileData.phone}
              />

              <InfoItem
                icon={FiUser}
                label="Gender"
                value={profileData.gender}
                capitalize
              />

              <InfoItem
                icon={FiDroplet}
                label="Blood Group"
                value={profileData.bloodGroup}
              />

              <InfoItem
                icon={FiCalendar}
                label="Date of Birth"
                value={formatDate(profileData.dob)}
              />

              <InfoItem
                icon={FiBook}
                label="Semester"
                value={profileData.semester}
              />

              <InfoItem
                icon={FiHash}
                label="Enrollment Number"
                value={profileData.enrollmentNo}
              />

              <InfoItem
                icon={FiBook}
                label="Branch"
                value={profileData.branchId?.name}
              />
            </div>
          </Section>
        </div>

        <div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 h-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <FiCheckCircle />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Student Account
                </h3>

                <p className="text-xs text-gray-500">
                  Your account information
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-blue-100">
                <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <FiCheckCircle className="text-sm" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Account Active
                  </p>

                  <p className="text-xs text-gray-400">
                    Your student account is active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-blue-100">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FiBook className="text-sm" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Academic Status
                  </p>

                  <p className="text-xs text-gray-400">
                    Semester {profileData.semester || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section icon={FiHome} title="Address Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <InfoItem
            icon={FiMapPin}
            label="Address"
            value={profileData.address}
          />

          <InfoItem
            icon={FiMapPin}
            label="City"
            value={profileData.city}
          />

          <InfoItem
            icon={FiMapPin}
            label="State"
            value={profileData.state}
          />

          <InfoItem
            icon={FiMapPin}
            label="Pincode"
            value={profileData.pincode}
          />

          <InfoItem
            icon={FiMapPin}
            label="Country"
            value={profileData.country}
          />
        </div>
      </Section>

      <Section icon={FiAlertCircle} title="Emergency Contact">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <InfoItem
            icon={FiUser}
            label="Name"
            value={profileData.emergencyContact?.name}
          />

          <InfoItem
            icon={FiUsers}
            label="Relationship"
            value={profileData.emergencyContact?.relationship}
            capitalize
          />

          <InfoItem
            icon={FiPhone}
            label="Phone"
            value={profileData.emergencyContact?.phone}
          />
        </div>
      </Section>

      {showPasswordUpdate && (
        <UpdatePasswordLoggedIn
          onClose={() => setShowPasswordUpdate(false)}
        />
      )}

      <Toaster position="bottom-center" />
    </div>
  );
};

export default Profile;