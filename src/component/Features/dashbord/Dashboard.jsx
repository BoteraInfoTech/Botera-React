import { useEffect, useState } from "react";
import FolderList from "./Dashbordcards";
import WelcomeBanner from "./Greeting";
import QickReport from "./QickReport";
import PerformanceGraph from "./performanceGraph";
import SummaryTable from "./SummaryTable";
import DashboardSkeleton from "./loader/loader";

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
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [taskData, setTaskData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [recentConversationData, setRecentConversation] = useState([]);

  //remove loader on success on get all Data
  useEffect(() => {
    if (
      !(
        userDetails.isLoading ||
        dashboardTask.isLoading ||
        dashboardDetails.isLoading ||
        dashboardPerformance.isLoading ||
        dashboardConversation.isLoading
      )
    ) {
      setLoading(false);
    }
  }, [
    userDetails.isLoading,
    dashboardTask.isLoading,
    dashboardDetails.isLoading,
    dashboardPerformance.isLoading,
    dashboardConversation.isLoading,
  ]);

  // get Data For First Time
  useEffect(() => {
    if (!dashboardTask.status) {
      getTaskDetails();
    }
  }, [dashboardTask.status, getTaskDetails]);
  useEffect(() => {
    if (!dashboardDetails.status) {
      getDashboardDetails();
    }
  }, [dashboardDetails.status, getDashboardDetails]);
  useEffect(() => {
    if (!userDetails.status) {
      getUserDetails();
    }
  }, [getUserDetails, userDetails.status]);
  useEffect(() => {
    if (!dashboardPerformance.status) {
      getPerformanceData();
    }
  }, [getPerformanceData, dashboardPerformance.status]);
  useEffect(() => {
    if (!dashboardConversation.status) {
      getRecentConversations();
    }
  }, [getRecentConversations, dashboardConversation.status]);

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
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          {/* Left Section */}
          <div className="w-full lg:w-1/2 m-2 mt-0">
            <WelcomeBanner userDetails={userData} />
            <FolderList cardData={cardData} />
            <QickReport taskData={taskData} />
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
