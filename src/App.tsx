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
import MasterLayout from "./modules/Shared/Components/MasterLayout/MasterLayout";
import DashBoard from "./modules/DashBoard/Components/DashBoard";
import Rooms from "./modules/Rooms/Rooms";
import Booking from "./modules/Booking/Booking";
// import Ads from "./modules/Ads/Ads";
import User from "./modules/User/User";
import Favorite_rooms from "./modules/Favorite_rooms/Favorite_rooms";
import Room_comments from "./modules/Room_comments/Room_comments";
import Room_reviews from "./modules/Room_reviews/Room_reviews";
import Room_facility from "./modules/Room_facility/Room_facility";
import { useContext } from "react";
import ProtectedRoute from "./modules/Auth/Components/ProtectedRoute/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import Ads from "./modules/Ads/Ads";

function App() {

  const LoginData = useContext(AuthContext);


  // const [loginData, setLoginData] = useState(null);
  // const saveLoginData = () => {
  //   const deCodedToken = localStorage.getItem("token");
  //   if (deCodedToken) {
  //     const enCodedToken = jwtDecode(deCodedToken);
  //     setLoginData(enCodedToken);
  //     console.log(enCodedToken);
  //   }
  // };

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
        <ProtectedRoute loginData={LoginData}>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <DashBoard /> },
        { path: "rooms", element: <Rooms /> },
        { path: "booking", element: <Booking /> },
        { path: "ads", element: <Ads/>},
        { path: "users", element: <User /> },
        { path: "favorite-rooms", element: <Favorite_rooms /> },
        { path: "room-comments", element: <Room_comments /> },
        { path: "room-reviews", element: <Room_reviews /> },
        { path: "room-facility", element: <Room_facility /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
