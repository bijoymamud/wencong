

import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import {  ChevronsLeft, ChevronsRight } from "lucide-react";
import { MdOutlineBarChart } from "react-icons/md";
import wencong_logo from '../../../public/huntrerboom_logo.png'


export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const menuItems = [
    {
      items: [
        { name: "Dashboard", icon: <LuLayoutDashboard size={20} />, path: "/home" },
        { name: "Sales Order", icon: <MdOutlineBarChart size={20} />, path: "/sales_order" },
        { name: "Sales Report", icon: <MdOutlineBarChart size={20} />, path: "/sales_report" },
        
      ],
    },
  ];

  useEffect(() => {
    const currentItem = menuItems[0].items.find(
      (item) => item.path === location.pathname
    );
    if (currentItem) {
      setSelectedItem(currentItem.name);
    }
  }, [location.pathname]);

  const handleItemClick = (itemName, path) => {
    setSelectedItem(itemName);
    navigate(path); 
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 transition-all duration-500 ease-in-out`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 pt-10">
          <div className="flex items-center ms-1 gap-2 mt-20">
            <div
              className={`transform transition-all duration-500 ${
                isCollapsed ? "opacity-0 -translate-x-full" : "opacity-100 translate-x-0"
              }`}
            >
             <img src={wencong_logo} alt="" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 md:mt-40">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-8">
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault(); 
                        handleItemClick(item.name, item.path);
                      }}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 group relative"
                    >
                      <span className="text-[#DE472D] group-hover:text-[#DE472D] transition-colors duration-300">
                        {item.icon}
                      </span>
                      <span
                        className={`transform text-[#DE472D] font-medium transition-all duration-500 ${
                          isCollapsed ? "opacity-0 -translate-x-full" : "opacity-100 translate-x-0"
                        } whitespace-nowrap`}
                      >
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-gray-200">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-300"
              >
                {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
              </button>
              <div className="flex flex-col">
                <span className="text-gray-700 font-bold text-xl">{selectedItem}</span>

               
                
              </div>
            </div>
          
          </div>
        </header>

   
        <main className="flex-1 overflow-auto p-6 bg-[#FFE4DF]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}