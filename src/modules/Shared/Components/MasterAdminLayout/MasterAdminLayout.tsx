import { Outlet } from "react-router-dom";
import SideBar from "../../../Admin/Components/Shared/Components/SideBar/SideBar";
import Navbar from "../../../User/Components/Shared/Components/Navbar/Navbar";
export default function MasterAdminLayout() {
  return (
    <div>
      <Navbar/>
      <SideBar/>
      <Outlet />
    </div>
  );
}
