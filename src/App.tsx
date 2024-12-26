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
import AdsList from "./modules/Admin/Components/Ads/AdsList/AdsList";
import AdsForm from "./modules/Admin/Components/Ads/AdDialog/AdDialog";
import BookingList from "./modules/Admin/Components/BookingList/BookingList";
import RoomFacilitiesList from "./modules/Admin/Components/RoomFacilities/RoomFacilitiesList/RoomFacilitiesList";
import RoomsList from "./modules/Admin/Components/Rooms/RoomsList/RoomsList";
import UserList from "./modules/Admin/Components/UserList/UserList";
import MasterAdminLayout from "./modules/Shared/Components/MasterAdminLayout/MasterAdminLayout";
import MasterUserLayout from "./modules/Shared/Components/MasterUserLayout/MasterUserLayout";
import HomePage from "./modules/User/Components/HomePage/HomePage";
import RoomDetailsPage from "./modules/User/Components/RoomDetailsPage/RoomDetailsPage";
import BookingPage from "./modules/User/Components/BookingPage/BookingPage";
import ExploarePage from "./modules/User/Components/Explore/ExplorePage";
import FavoriteRoomPage from "./modules/User/Components/FavoriteRoomPage/FavoriteRoomPage";
import ProtectedRoute from "./modules/Auth/Components/ProtectedRoute/ProtectedRoute";
import { useContext } from "react";
import { AuthContext, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React from "react";
import RoomForm from "./modules/Admin/Components/Rooms/RoomForm/RoomForm";
import ExplorePage from "./modules/User/Components/Explore/ExplorePage";


const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#152C5B', // Primary blue
    },
    secondary: {
      main: '#000000', // Black
    },
    background: {
      default: '#ffffff', // White background
      paper: '#FAFAFA', // Off-white
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#ffffff', // White text for contrast
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#152C5B', // Keep primary blue
    },
    secondary: {
      main: '#ffffff', // White text
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1A1B1E', // Dark gray
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#000000', // Black for contrast
    },
  },
});

function App() {

  const [theme, setTheme] = React.useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev.palette.mode === 'light' ? darkTheme : lightTheme));
  };

  const authContext = useContext(AuthContext);
  const { loginData } = useAuth();
  if (!authContext) {
    console.error(
      "AuthContext not found. Make sure it's wrapped in AuthContextProvider."
    );
    return null;
  }

    const router = createBrowserRouter([
      {
        path: "login",
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
          // { path: "ads-list/ads-form", element: <AdsForm /> },
          // { path: "ads-list/:adsId", element: <AdsForm /> },
          { path: "favoriteroomPage", element: <FavoriteRoomPage /> },

          { path: "room-facility", element: <RoomFacilitiesList /> },
          {
            path: "room-facility/facility-form",
            element: <RoomFacilitiesList />,
          },
          { path: "room-facility/:facilityId", element: <RoomFacilitiesList /> },

          { path: "rooms-list", element: <RoomsList /> },
          { path: "rooms-list/room-form", element: <RoomFacilitiesList /> },
          { path: "rooms-list/:roomId", element: <RoomFacilitiesList /> },

          { path: "booking-list", element: <BookingList /> },
          { path: "users-list", element: <UserList /> },
        ],
      },
    {
      path: "auth",
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
  
        { path: "room-facility", element: <RoomFacilitiesList /> },

        { path: "rooms-list", element: <RoomsList /> },
        { path: "rooms-list/new-room", element: <RoomForm /> },
        { path: "rooms-list/:roomId", element: <RoomForm /> },




        { path: "booking-list", element: <BookingList /> },
        { path: "users-list", element: <UserList /> },
      ],
    },
    {
      path: "/",
      element: <MasterUserLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "homepage", element: <HomePage /> },
        { path: "room-details", element: <RoomDetailsPage /> },
        {
          path: "payment",
          element: (
            <ProtectedRoute loginData={loginData}>
              <BookingPage />
            </ProtectedRoute>
          ),
        },
        { path: "explore-rooms", element: <ExplorePage /> },
        {
          path: "your-favorite",
          element: <FavoriteRoomPage />,
        },
      ],
    },
  ]);

  return (
    <>
       <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <button onClick={toggleTheme}>Toggle Theme</button> */}

      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>    
      
      </ThemeProvider>
      
    </>
  );
}

export default App;
