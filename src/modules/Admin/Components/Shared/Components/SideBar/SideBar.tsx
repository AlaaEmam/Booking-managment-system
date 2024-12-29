import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
  let navigate = useNavigate();
=======
import { Link } from "react-router-dom";
import { useAuth } from "../../../../../../context/AuthContext";

export default function SideBar() {
  const { clearLoginData } = useAuth();
>>>>>>> 2d2346bb729f0cea3ec9ed4b08a546d2ca1db394
  const [isCollapse, setIsCollapse] = useState(false);
  const toggleCollpase = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapse}>
        <Menu>
<<<<<<< HEAD
          <divnp
=======
          <div
>>>>>>> 2d2346bb729f0cea3ec9ed4b08a546d2ca1db394
            onClick={toggleCollpase}
            style={{
              cursor: "pointer",
              marginTop: "3rem",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <img
              src="/logo-light.svg"
              style={{ maxWidth: "100%", width: "80%" }}
              alt="logo"
            />{" "}
          </div>
          <MenuItem
<<<<<<< HEAD
  icon={<i className="bi bi-house-door"></i>}
  component={<Link to="/dashboard" />}>
  Home
</MenuItem>
<MenuItem
  icon={<i className="bi bi-people"></i>}
  component={<Link to="/dashboard/users-list" />}>
  Users
</MenuItem>

<MenuItem
  icon={<i className="bi bi-columns-gap"></i>}
  component={<Link to="/dashboard/rooms-list" />}>
  Rooms
</MenuItem>
<MenuItem
  icon={<i className="bi bi-columns-gap"></i>}
  component={<Link to="/dashboard/ads-list" />}>
  Ads
</MenuItem>
<MenuItem
  icon={<i className="bi bi-columns-gap"></i>}
  component={<Link to="/dashboard/booking-list" />}>
  Bookings
</MenuItem>
<MenuItem
  icon={<i className="bi bi-columns-gap"></i>}
  component={<Link to="/dashboard/room-facility" />}>
  Facilities
</MenuItem>
<MenuItem
  icon={<i className="bi bi-lock"></i>}
  component={<Link to="/dashboard/change-password" />}>
  Change Password
</MenuItem>
<MenuItem
  icon={<i className="bi bi-box-arrow-right"></i>}
  component={<Link to="/" />}
  onClick={() => {
    localStorage.removeItem("token");
  }}>
  Logout
</MenuItem>

=======
            icon={<i className="bi bi-house-door"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-people"></i>}
            component={<Link to="users-list" />}
          >
            Users
          </MenuItem>

          <MenuItem
            icon={<i className="bi bi-columns-gap"></i>}
            component={<Link to="rooms-list" />}
          >
            Rooms
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-columns-gap"></i>}
            component={<Link to="ads-list" />}
          >
            Ads
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-columns-gap"></i>}
            component={<Link to="booking-list" />}
          >
            Bookings
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-columns-gap"></i>}
            component={<Link to="room-facility" />}
          >
            Facilities
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-lock"></i>}
            component={<Link to="/auth/change-password" />}
          >
            Change Password
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-box-arrow-right"></i>}
            component={<Link to="/auth/login" />}
            onClick={() => {
              clearLoginData();
            }}
          >
            Logout
          </MenuItem>
>>>>>>> 2d2346bb729f0cea3ec9ed4b08a546d2ca1db394
        </Menu>
      </Sidebar>
    </div>
  );
}
