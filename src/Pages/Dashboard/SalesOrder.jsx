

import { useState } from "react";
import home_icon from "../../../public/icon_home.png";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function OrderTable() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  const tabs = ["All", "Pending", "Awaiting Shipment", "Cancelled", "Completed", "Return"];

  const orders = [
    {
      id: "SO-000022",
      date: "1/3/2022 2:00pm",
      status: "Pending",
      customer: "Jessie L.",
      image: "https://cdn.iconscout.com/icon/free/png-256/free-dhl-express-logo-icon-download-in-svg-png-gif-file-formats--industry-company-brand-pack-logos-icons-2875356.png",
      address: "1951 Tom Mountain Ave, Johor, MY 91762",
      phone: "+60123 1234567",
      items: "17 Items",
      itemDetails: "168红茶 | 小包装(1.8-8.0g) - 1st Kaki Red & Rose, 108 KAKI EMAS",
      remark: "(2 day delivery) Don't deliver on weekends",
      shipment: "DHL Standard MYR27.7",
      actions: ["View", "Edit", "Change Status", "Print"],
    },
    {
      id: "SO-000023",
      date: "2/5/2022 1:00pm",
      status: "Return",
      image: "https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Lalamove-V.png",
      customer: "Emily W.",
      address: "1951 Tom Mountain Ave, Johor, MY 91762",
      phone: "+60123 1234567",
      items: "10 Items",
      itemDetails: "10pcs红茶 | 小包装(1.8-8.0g) - 1st Kaki Red & Rose, 108 KAKI EMAS",
      remark: "(2 day delivery) Don't deliver on weekends",
      shipment: "Lalamove MYR10.5",
      actions: ["View"],
    },
    {
      id: "SO-000024",
      date: "3/7/2022 3:30pm",
      status: "Awaiting Shipment",
      image: "https://cdn.iconscout.com/icon/free/png-256/free-dhl-express-logo-icon-download-in-svg-png-gif-file-formats--industry-company-brand-pack-logos-icons-2875356.png",
      customer: "Michael B.",
      address: "1234 Elm St, Johor, MY 91762",
      phone: "+60123 7654321",
      items: "20 Items",
      itemDetails: "50pcs Kaki Red & Rose, 50pcs Green Tea | KAKI EMAS",
      remark: "(Same day delivery) Deliver on weekends",
      shipment: "DHL Express MYR35.0",
      actions: ["View", "Change Status", "Print"],
    },
    {
      id: "SO-000025",
      date: "5/5/2022 5:00pm",
      status: "Completed",
      image: "https://cdn.iconscout.com/icon/free/png-256/free-dhl-express-logo-icon-download-in-svg-png-gif-file-formats--industry-company-brand-pack-logos-icons-2875356.png",
      customer: "Sarah T.",
      address: "5678 Oak St, Johor, MY 91762",
      phone: "+60123 4567890",
      items: "8 Items",
      itemDetails: "168 Kaki Red & Rose, 108 KAKI EMAS",
      remark: "(3 day delivery) No weekend delivery",
      shipment: "DHL Standard MYR27.7",
      actions: ["View", "Change Status", "Print"],
    },
  ];

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(orders.map((_, index) => index));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (index, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, index]);
    } else {
      setSelectedOrders(selectedOrders.filter((i) => i !== index));
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "badge text-xs font-medium px-3 py-1";
    switch (status) {
      case "Awaiting":
        return `${baseClasses} bg-orange-100 text-orange-800 border-orange-200`;
      case "Pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-200`;
      case "Cancelled":
        return `${baseClasses} bg-gray-100 text-gray-800 border-gray-200`;
      case "Completed":
        return `${baseClasses} bg-green-100 text-green-800 border-green-200`;
      case "Return":
        return `${baseClasses} bg-red-100 text-red-800 border-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border-gray-200`;
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      (activeTab === "All" || order.status === activeTab) &&
      (statusFilter === "" || order.status === statusFilter)
  );

  return (
    <div className="min-h-screen bg-red-50 p-6">
      <div className="mx-auto">
        {/* Header Tabs */}
        <div className="tabs tabs-boxed mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "tab-active" : ""} font-semibold`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className=" flex items-center  justify-between gap-5  mb-5">
         
            <div className="flex-1 relative basis-7/12">
              <input
                type="text"
                placeholder="Order number/Customer name/SKU..."
                className="input input-bordered w-full pr-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
    
            <div className="basis-5/12">
                  <select defaultValue="Server location" className="select select-neutral">
                    <option >All Status</option>
                    <option>All</option>
                    <option>Pending</option>
                    <option>Awaiting Shipment</option>
                    <option>Cancelled</option>
                    <option>Completed</option>
                    <option>Return</option>
              </select>
                </div>
            <Link 
            to="/product"
            className="btn bg-[#F04E24] hover:bg-orange-600 text-white">Add New Order</Link>
        </div>

       

        <div className="bg-white rounded-lg shadow-sm">
          <div className="">
            <table className="table table-zebra w-full">
              <thead className="bg-[#F04E24] text-white text-[14px]">
                <tr>
                  <th className="">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs rounded-sm"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={selectedOrders.length === filteredOrders.length}
                    />
                  </th>
                  <th className="text-left font-semibold">Sales Order & Date</th>
                  <th className="text-left font-semibold w-[180px]">Status</th>
                  <th className="text-left font-semibold">Recipient</th>
                  <th className="text-left font-semibold">Items</th>
                  <th className="text-left font-semibold">Remark</th>
                  <th className="text-left font-semibold">Shipment</th>
                  <th className="text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-xs rounded-sm"
                        checked={selectedOrders.includes(index)}
                        onChange={(e) => handleSelectOrder(index, e.target.checked)}
                      />
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold text-[#F04E24] text-[13px]">{order.id}</div>
                        <div className="text-sm text-[#516F90] text-[13px]">Created: {order.date}</div>
                      </div>
                    </td>
                    <td className="text-[13px]">
                      <span className={getStatusBadge(order.status)}>{order.status}</span>
                    </td>
                    <td>
                      <div className="flex items-start gap-2">
                        <img src={home_icon} alt="" />
                        <div>
                          <div className="font-semibold text-[13px]">{order.customer}</div>
                          <div className="text-sm text-[#516F90] text-[13px]">{order.address}</div>
                          <div className="text-sm text-[#516F90] text-[13px]">{order.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-semibold text-[13px]">{order.items}</div>
                        <div className="text-sm text-[#516F90] max-w-xs truncate">{order.itemDetails}</div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm text-gray-600 max-w-xs">{order.remark}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img src={order.image} alt="" className="w-[50px]" />
                        <span className="text-sm">{order.shipment}</span>
                      </div>
                    </td>
                    <td>
                      <div className="dropdown dropdown-end border p-1 rounded-full hover:bg-[#f8d1ca]">
                        <div tabIndex={0} role="button" className="m-1">
                          <BsThreeDots className="flex mx-auto justify-center" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-[#FFE4DF] rounded-box w-40 shadow-md border border-gray-300"
                        >
                          {/* Static dropdown menu */}
                          <li>
                            <Link to={`/product/${order?.id}`} className="hover:bg-[#f78e7c] flex items-center justify-center">Edit</Link>
                          </li>
                          <li>
                            <a className="hover:bg-[#f78e7c] flex items-center justify-center">Change Status</a>
                          </li>
                          <li>
                            <a className="hover:bg-[#f78e7c] flex items-center justify-center">Print</a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-end items-center mt-6 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Viewing 1-12 of 61</span>
            <div className="join">
              <button className="join-item btn btn-sm">«</button>

              <button className="join-item btn btn-sm btn-active bg-orange-500 text-white border-orange-500">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">4</button>

              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
