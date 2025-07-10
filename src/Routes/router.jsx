

import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../Pages/Dashboard/Home";
import Bookings from "../Pages/Dashboard/Bookings";
import SignUp from "../Pages/Authentication/SignIn";
import SalesOrder from "../Pages/Dashboard/SalesOrder";
import AddProduct from "../Pages/Dashboard/AddProduct";
import Dashboard from "../Pages/Dashboard/Dashboard";
import { MdOutlineBarChart } from "react-icons/md";
import AgentSalesReport from "../Pages/Dashboard/AgentSalesReport";
// import AgentSalesReport from "../Pages/Dashboard/AgentSalesReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        index: true, 
        element: <AdminHome />
      },
      {
        path: "home",
        element: <AdminHome />
      },
      {
        path: "sales_order",
        element: <SalesOrder/>
      }, 
      {
        path: "booking_info",
        element:<Bookings/>
      },
      {
        path: "product/:id?",
        element: <AddProduct/>
      },
     {

        name: "Sales Report",
        icon: <MdOutlineBarChart size={20} />,
        path: "/sales_report", 
        children: [
          {
          
            name: "Agent Sales Report",
            path: "agent_sales_report",
            element: <AgentSalesReport/>
          },
      
        ],
      },
    ]
  },

  {
    path: "/sign_up",
    element: <SignUp/>
  }
]);
