import { useState } from "react";
import { useNavigate } from "react-router-dom";
import appLogo from "../image/app-logo.png";
import CustomizedTooltips from "./commonComponents/Tooltip";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TopicIcon from "@mui/icons-material/Topic";

const menuItems = [
  {
    icon: <HomeOutlinedIcon fontSize="medium" />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <PersonOutlineOutlinedIcon fontSize="medium" />,
    label: "Profile",
    path: "/profile",
  },
  {
    icon: <AccountTreeIcon fontSize="medium" />,
    label: "Account",
    path: "/account",
  },
  {
    icon: <ContactsOutlinedIcon fontSize="medium" />,
    label: "contacts",
    path: "/contacts",
  },
  {
    icon: <ForumOutlinedIcon fontSize="medium" />,
    label: "Conversations",
    submenu: [
      {
        icon: <WhatsAppIcon fontSize="small" />,
        label: "whatsapp",
        path: "/conversations/whatsapp",
      },
    ],
  },
  {
    icon: <MenuBookOutlinedIcon fontSize="medium" />,
    label: "Knowledge",
    submenu: [
      {
        icon: <TopicIcon fontSize="small" />,
        label: "Add Knowledge",
        path: "/knowledge/add",
      },
      {
        icon: <SmartToyIcon fontSize="small" />,
        label: "Configure AI",
        path: "/knowledge/ai",
      },
    ],
  },
];

export function Sidebar({ collapsed, setCollapsed }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [submenuActive, setSubmenuActive] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenu, setSubMenu] = useState([]);
  const [submenuPosition, setSubmenuPosition] = useState(null);
  const navigate = useNavigate();

  const menuItemsDecorator = ({ icon, label, submenu, path }) => {
    const isActive = activeItem === label;
    const isOpen = openSubmenu === label;

    const handleClick = (e) => {
      setActiveItem(label);
      setSubMenu(submenu);
      if (submenu) {
        const rect = e.currentTarget.getBoundingClientRect();
        setSubmenuPosition(rect.top);
        setOpenSubmenu(isOpen ? null : label);
      } else {
        setOpenSubmenu(null);
        if (path) navigate(path);
      }
    };

    return (
      <div key={label}>
        <div
          key={label}
          className={`relative group ${
            !isActive && "hover:bg-[#1F2937]"
          } p-2 items-center}`}
          onClick={handleClick}
        >
          <button
            className={`flex items-center justify-between text-sm p-2 rounded w-full ${
              sidebarOpen ? "" : "justify-center"
            }`}
          >
            <span
              className={`flex items-center space-x-2 ${
                sidebarOpen ? "" : "justify-center w-full"
              } bg-gray-10`}
            >
              <span className={`mx-auto ${isActive && "text-[#F59E0B]"}`}>
                {icon}
              </span>
              {sidebarOpen && (
                <span className={` ${isActive && "text-[#F59E0B]"}`}>
                  {label}
                </span>
              )}
            </span>
            {submenu && sidebarOpen && (
              <span>
                {isOpen ? (
                  <ArrowDropDownIcon
                    fontSize="small"
                    className="text-[#F59E0B]"
                  />
                ) : (
                  <ArrowRightIcon
                    fontSize="small"
                    className={` ${isActive && "text-[#F59E0B]"}`}
                  />
                )}
              </span>
            )}
          </button>
        </div>
        {submenu && sidebarOpen && (
          <div
            className={`ml-10 mt-1 flex flex-col text-sm text-white border-l border-[#F59E0B] overflow-hidden
      transition-[max-height,opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
      ${
        isOpen
          ? "max-h-40 opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-2"
      }
    `}
          >
            {submenu.map((item) => {
              const isActiveSubmenu = submenuActive === item.label;
              return (
                <div
                  key={label}
                  className={`relative p-2 items-center  hover:bg-[#1F2937] `}
                >
                  <button
                    key={item}
                    className="py-1 px-2 rounded text-left"
                    onClick={() => {
                      setSubmenuActive(item.label);
                      if (item.path) navigate(item.path);
                    }}
                  >
                    <span className={`flex items-center space-x-2  bg-gray-10`}>
                      <span
                        className={`mx-auto ${
                          isActiveSubmenu && "text-[#F59E0B]"
                        }`}
                      >
                        {item.icon}
                      </span>
                      {sidebarOpen && (
                        <span
                          className={` ${isActiveSubmenu && "text-[#F59E0B]"}`}
                        >
                          {item.label}
                        </span>
                      )}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const logoutButton = () => {
    return (
      <button
        className={`flex items-center text-sm p-4 mb-2 w-full ${
          sidebarOpen ? "space-x-2" : "justify-center"
        }`}
        onClick={() => {
          setActiveItem("Logout");
        }}
      >
        <LogoutOutlinedIcon
          fontSize="small"
          className={`${activeItem === "Logout" && "text-[#F59E0B]"}`}
        />
        {sidebarOpen && (
          <span className={`${activeItem === "Logout" && "text-[#F59E0B]"}`}>
            Logout
          </span>
        )}
      </button>
    );
  };

  return (
    <div className={`flex bg-[rgb(245,247,251)]`}>
      <div
        className={`transition-all duration-300 fixed left-0 top-0 z-50 flex flex-col justify-between
      ${sidebarOpen ? "w-52" : "md:w-16 w-14"} 
      bg-[#111827] min-h-screen shadow-lg text-white overflow-visible`}
      >
        <div>
          <div className="flex items-center justify-between w-full p-3">
            <div
              className={`flex items-center space-x-2 ${
                !sidebarOpen && "justify-center w-full items-center"
              } `}
            >
              <img
                src={appLogo}
                alt="App Logo"
                className="w-9 h-9 object-contain bg-white border-2 border-white rounded-full"
              />
              {sidebarOpen && (
                <span className="text-white font-semibold text-lg">Botera</span>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#3D5AFE] text-lg focus:outline-none absolute -right-3 top-4 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 z-10"
            >
              {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </button>
          </div>
          <div className="space-y-1 w-full relative mt-3">
            {menuItems.map(({ icon, label, submenu, path }) => {
              const isActive = activeItem === label;
              if (sidebarOpen || (isActive && subMenu && subMenu.length))
                return menuItemsDecorator({ icon, label, submenu, path });
              return (
                <CustomizedTooltips title={label} key={label} placement="right">
                  {menuItemsDecorator({ icon, label, submenu, path })}
                </CustomizedTooltips>
              );
            })}
            {!sidebarOpen && subMenu && subMenu.length ? (
              <div
                className="absolute left-full ml-2 bg-[#111827] text-white rounded shadow-lg py-2 w-44 z-50"
                style={{ top: submenuPosition - 60 }}
              >
                <div className="px-4 py-2 border-b border-gray-700 text-[#F59E0B]">
                  {activeItem}
                </div>
                {subMenu.map((item, idx) => {
                  const isActiveSubmenu = submenuActive === item.label;
                  return (
                    <div
                      key={idx}
                      className="px-4 py-2 hover:bg-[#1F2937] cursor-pointer text-sm"
                      onClick={() => {
                        setSubmenuActive(item.label);
                        setSubMenu([]);
                        if (item.path) navigate(item.path);
                      }}
                    >
                      <span
                        className={`flex bg-gray-10  items-center space-x-2`}
                      >
                        <span
                          className={` ${isActiveSubmenu && "text-[#F59E0B]"}`}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={` ${isActiveSubmenu && "text-[#F59E0B]"}`}
                        >
                          {item.label}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {sidebarOpen ? (
          logoutButton()
        ) : (
          <CustomizedTooltips title="Logout" key="Logout" placement="right">
            {logoutButton()}
          </CustomizedTooltips>
        )}
      </div>
    </div>
  );
}
