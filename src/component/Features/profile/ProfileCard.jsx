import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Button from "../../commonComponents/Button";

export default function ProfileCard({ fullName, email }) {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center relative h-auto">
      {/* Avatar */}
      <div className="relative w-24 h-24 mb-4">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-600 text-white text-3xl font-bold">
          {fullName.charAt(0)}
        </div>
      </div>

      {/* User Info */}
      <h2 className="text-lg font-semibold">{fullName}</h2>
      <p className="text-gray-500">{email}</p>

      {/* Trial Info (hidden on mobile) */}
      <div className="hidden md:flex flex-1 flex-col justify-center mt-8 w-full">
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 text-yellow-800 rounded-xl p-6 text-sm shadow-md flex flex-col items-center">
          <AccessTimeOutlinedIcon
            className="text-yellow-600 mb-3"
            fontSize="large"
          />
          <p className="font-semibold text-lg">You're on Free Trial</p>
          <p className="text-sm mt-2 leading-relaxed">10 credits remaining</p>
          <p className="text-sm mt-1 leading-relaxed">
            Want to continue using without interruption?
          </p>
          <Button
            text={"Contact Us"}
            className="mt-5 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition text-sm shadow"
          />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="mt-2 flex flex-col gap-3 w-full">
        <Button className="px-6 py-3 " text={"Update Profile"} />
        <Button
          className="px-6 py-3 border border-red-500 text-red-500  hover:bg-red-50"
          text={"Delete Account"}
          isCustomButton={true}
        />
      </div>
    </div>
  );
}
