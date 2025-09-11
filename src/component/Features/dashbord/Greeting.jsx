import React from "react";

export default function WelcomeBanner() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-4 mt-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-semibold text-[#263238]">
          Welcome Jannie
        </h2>
        <p className="text-sm text-[#26323899] mt-1">
          You have only 10 auto-reply credits left. To continue using
          auto-replies without interruption, please reach out to our team.
        </p>
        <button className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 rounded bg-[#3B82F6] text-white text-sm font-medium hover:bg-[#304FFE]">
          Contact Us
        </button>
      </div>
    </div>
  );
}
