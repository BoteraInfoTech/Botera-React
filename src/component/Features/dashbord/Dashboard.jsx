import FolderList from "./Dashbordcards";
import WelcomeBanner from "./Greeting";
import QickReport from "./QickReport";
import PerformanceGraph from "./performanceGraph";
import SummaryTable from "./SummaryTable";

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 ml-14 mr-4 md:ml-0 bg-[#F9FAFB]">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 m-2 mt-0">
        <WelcomeBanner />
        <FolderList />
        <QickReport />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 m-2 mt-0">
        <PerformanceGraph />
        <SummaryTable />
      </div>
    </div>
  );
}
