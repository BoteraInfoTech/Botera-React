import React from "react";
import Button from "../../commonComponents/Button";

export default function WelcomeBanner({ userDetails, setShowContactUs }) {
  const { totalCredit, name } = userDetails;
  const userName = name || "";
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-4 mt-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-semibold text-[#263238]">
          {`Welcome ${userName}`}
        </h2>
        <p className="text-sm text-[#26323899] mt-1">
          {`You have only ${totalCredit} auto-reply credits left. To continue using
          auto-replies without interruption, please reach out to our team.`}
        </p>
        <Button
          text={"Contact Us"}
          className="mt-3"
          onClick={() => setShowContactUs(true)}
        />
      </div>
    </div>
  );
}
