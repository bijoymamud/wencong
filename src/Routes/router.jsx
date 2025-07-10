

import { createBrowserRouter } from "react-router-dom";
import Dashborad from "../Pages/Dashboard/Dashborad";
import AdminHome from "../Pages/Dashboard/Home";
import Bookings from "../Pages/Dashboard/Bookings";
import SignUp from "../Pages/Authentication/SignIn";
import SalesOrder from "../Pages/Dashboard/SalesOrder";
import AddProduct from "../Pages/Dashboard/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashborad />,
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
      }
    ]
  },

  {
    path: "/sign_up",
    element: <SignUp/>
  }
]);
