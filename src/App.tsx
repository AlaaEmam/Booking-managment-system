import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/Shared/Components/AuthLayout/AuthLayout";
import Notfound from "./modules/Shared/Components/Notfound/Notfound";
import Login from "./modules/Auth/Components/Login/Login";
import ForgetPassword from "./modules/Auth/Components/ForgetPassword/ForgetPassword";
import ResetPass from "./modules/Auth/Components/ResetPass/ResetPass";
import Registration from "./modules/Auth/Components/Registration/Registration";
import VerifyAccount from "./modules/Auth/Components/VerifyAccount/VerifyAccount";
import ChangePassword from "./modules/Auth/Components/ChangePassword/ChangePassword";
import DashBoard from "./modules/Admin/Components/DashBoard/Components/DashBoard";
import AdsList from './modules/Admin/Components/Ads/AdsList/AdsList';
import AdsForm from './modules/Admin/Components/Ads/AdsForm/AdsForm';
import BookingList from "./modules/Admin/Components/BookingList/BookingList";
import RoomFacilitiesList from "./modules/Admin/Components/RoomFacilities/RoomFacilitiesList/RoomFacilitiesList";
import RoomsList from "./modules/Admin/Components/Rooms/RoomsList/RoomsList";
import UserList from './modules/Admin/Components/UserList/UserList';
import MasterAdminLayout from "./modules/Shared/Components/MasterAdminLayout/MasterAdminLayout";
import MasterUserLayout from "./modules/Shared/Components/MasterUserLayout/MasterUserLayout";
import HomePage from './modules/User/Components/HomePage/HomePage';
import RoomDetailsPage from "./modules/User/Components/RoomDetailsPage/RoomDetailsPage";
import BookingPage from "./modules/User/Components/BookingPage/BookingPage";
import ExploarePage from "./modules/User/Components/ExploarePage/ExploarePage";
import FavoriteRoomPage from "./modules/User/Components/FavoriteRoomPage/FavoriteRoomPage";
import ProtectedRoute from "./modules/Auth/Components/ProtectedRoute/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const  loginData  = useContext(AuthContext); // Get loginData from context

  const router = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "registration", element: <Registration /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
           <MasterAdminLayout />
        </ProtectedRoute>
            ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <DashBoard /> },

        { path: "ads-list", element: <AdsList /> },
        { path: 'ads-list/ads-form', element: <AdsForm/> },
        { path: 'ads-list/:adsId', element: <AdsForm/> },
        
        { path: "room-facility", element: <RoomFacilitiesList /> },
        { path: "room-facility/facility-form", element: <RoomFacilitiesList /> },
        { path: "room-facility/:facilityId", element: <RoomFacilitiesList /> },

        { path: "rooms-list", element: <RoomsList /> },
        { path: "rooms-list/room-form", element: <RoomFacilitiesList /> },
        { path: "rooms-list/:roomId", element: <RoomFacilitiesList /> },

        { path: "booking-list", element: <BookingList /> },
        { path: "users-list", element: <UserList /> },

      ],
    },
    {
      path: "homepage",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterUserLayout />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <HomePage /> },
        
        { path: "room-details", element: <RoomDetailsPage /> },
        { path: "payment", element: <BookingPage /> },
        { path: "explore-rooms", element: <ExploarePage /> },
        {path: "your-favorite", element: <FavoriteRoomPage/> }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
