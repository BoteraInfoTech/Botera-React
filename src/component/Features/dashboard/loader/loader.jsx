import React from "react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

const DashboardSkeleton = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-6 mt-2">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="p-4 rounded-2xl shadow-sm bg-white flex flex-col gap-3 mt-3">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-10 w-32 mt-2" />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>

            {/* Tasks */}
            <div className="p-4 rounded-2xl shadow-sm bg-white space-y-3">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 space-y-6 mt-3 ">
        {/* Weekly Performance Chart */}
        <div className="p-4 rounded-2xl shadow-sm bg-white">
          <Skeleton className="h-5 w-1/3 mb-4" />
          <Skeleton className="h-48 w-full" />
        </div>

        {/* Today's Conversations */}
        <div className="p-4 rounded-2xl shadow-sm bg-white">
          <Skeleton className="h-5 w-1/3 mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
