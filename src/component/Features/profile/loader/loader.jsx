const Skeleton = ({ className }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

export default function ProfileSkeleton() {
  return (
    <>
      {" "}
      {/* Left Profile Card Loader */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      {/* Right Side Form Loader */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-5rem)] pr-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-4"
          >
            {/* Section Title */}
            <Skeleton className="h-5 w-32" />

            {/* Section Fields */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
