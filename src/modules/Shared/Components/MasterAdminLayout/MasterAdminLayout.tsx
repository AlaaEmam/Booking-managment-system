import { Outlet } from "react-router-dom";
import SideBar from "../../../Admin/Components/Shared/Components/SideBar/SideBar";
import NavbarAdmin from "../../../Admin/Components/Shared/Components/NavbarAdmin/NavbarAdmin";
export default function MasterAdminLayout() {
  return (
    <div>
      
      <NavbarAdmin/>
      <SideBar/>
      <Outlet />
    </div>
  );
}
