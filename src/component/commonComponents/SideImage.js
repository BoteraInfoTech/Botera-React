import visuals from "./image/loginVisuals.png";

export default function SideImage() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center bg-gray-100 p-10 w-full md:w-1/2 space-y-6">
      <img
        src={visuals}
        alt="Login Visual"
        className="max-w-xs drop-shadow-xl min-w-[80%]"
      />
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Grow Your Business Online with AI
      </h2>
      <p className="text-sm text-center text-gray-600">
        Leverage AI to automate tasks and boost productivity
      </p>
    </div>
  );
}
