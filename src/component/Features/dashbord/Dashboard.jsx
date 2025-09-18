import { useEffect, useState } from "react";
import FolderList from "./Dashbordcards";
import WelcomeBanner from "./Greeting";
import QickReport from "./QickReport";
import PerformanceGraph from "./performanceGraph";
import SummaryTable from "./SummaryTable";
import DashboardSkeleton from "./loader/loader";

export default function Dashboard({ getUserDetails, userDetails }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userDetails.isLoading !== loading) {
      setLoading(userDetails.isLoading);
    }
  }, [loading, userDetails.isLoading]);

  useEffect(() => {
    if (!userDetails.status) {
      getUserDetails();
    }
  }, [getUserDetails, userDetails.status]);

  useEffect(() => {
    if (userDetails) {
      const data = userDetails?.successResponse?.response?.userDetails || {};
      setUserData(data);
    }
  }, [userDetails]);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 ml-14 mr-4 md:ml-0 bg-[#F9FAFB]">
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          {/* Left Section */}
          <div className="w-full lg:w-1/2 m-2 mt-0">
            <WelcomeBanner userDetails={userData} />
            <FolderList />
            <QickReport />
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 m-2 mt-0">
            <PerformanceGraph />
            <SummaryTable />
          </div>
        </>
      )}
    </div>
  );
}
