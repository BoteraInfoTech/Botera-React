import { useEffect, useState } from "react";
import FolderList from "./Dashbordcards";
import WelcomeBanner from "./Greeting";
import QickReport from "./QickReport";
import PerformanceGraph from "./performanceGraph";
import SummaryTable from "./SummaryTable";
import DashboardSkeleton from "./loader/loader";
import CalendlyWidget from "../../thirdParty/CalendlyWidget";

export default function Dashboard({
  getUserDetails,
  userDetails,
  dashboardTask,
  getTaskDetails,
  dashboardDetails,
  getDashboardDetails,
  getPerformanceData,
  dashboardPerformance,
  getRecentConversations,
  dashboardConversation,
}) {
  const [userData, setUserData] = useState({});
  const [taskData, setTaskData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [showContactUs, setShowContactUs] = useState(false);

  const [performanceData, setPerformanceData] = useState([]);
  const [recentConversationData, setRecentConversation] = useState([]);

  //remove loader on success on get all Data
  const isLoading =
    userDetails.isLoading ||
    dashboardTask.isLoading ||
    dashboardDetails.isLoading ||
    dashboardPerformance.isLoading ||
    dashboardConversation.isLoading;

  // get Data For First Time
  useEffect(() => {
    getTaskDetails();
    getDashboardDetails();
    getUserDetails();
    getPerformanceData();
    getRecentConversations();
  }, [
    getTaskDetails,
    getDashboardDetails,
    getUserDetails,
    getPerformanceData,
    getRecentConversations,
  ]);

  // set Data on Success
  useEffect(() => {
    if (userDetails) {
      const data = userDetails?.successResponse?.response?.userDetails || {};
      setUserData(data);
    }
  }, [userDetails]);

  useEffect(() => {
    if (dashboardTask) {
      const data = dashboardTask?.successResponse?.response?.tasks || [];
      setTaskData(data);
    }
  }, [dashboardTask]);
  useEffect(() => {
    if (dashboardDetails) {
      const data = dashboardDetails?.successResponse?.response?.cards || [];
      setCardData(data);
    }
  }, [dashboardDetails]);
  useEffect(() => {
    if (dashboardPerformance) {
      const data =
        dashboardPerformance?.successResponse?.response?.performance || [];
      setPerformanceData(data);
    }
  }, [dashboardPerformance]);
  useEffect(() => {
    if (dashboardConversation) {
      const data =
        dashboardConversation?.successResponse?.response?.conversation || [];
      setRecentConversation(data);
    }
  }, [dashboardConversation]);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 ml-14 mr-4 md:ml-0 bg-[#F9FAFB]">
      {showContactUs ? (
        <CalendlyWidget onClose={() => setShowContactUs(false)} />
      ) : null}
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          {/* Left Section */}
          <div className="w-full lg:w-1/2 m-2 mt-0">
            <WelcomeBanner
              userDetails={userData}
              setShowContactUs={setShowContactUs}
            />
            <FolderList cardData={cardData} />
            <QickReport
              taskData={taskData}
              setShowContactUs={setShowContactUs}
            />
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 m-2 mt-0">
            <PerformanceGraph chartData={performanceData} />
            <SummaryTable rows={recentConversationData} />
          </div>
        </>
      )}
    </div>
  );
}
