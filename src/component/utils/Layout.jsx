// Layout.jsx
import { Sidebar } from "../Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex bg-gray-50 w-full">
      <Sidebar />
      <div className="md:ml-20 w-full ">{children}</div>
    </div>
  );
}
