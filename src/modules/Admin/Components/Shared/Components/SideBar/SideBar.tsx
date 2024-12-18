import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
  let navigate = useNavigate();
  const [isCollapse, setIsCollapse] = useState(false);
  const toggleCollpase = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapse}>
        <Menu>
          <div
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
            icon={<i className="bi bi-house-door"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-people"></i>}
            component={<Link to="/users-list" />}
          >
            Users
          </MenuItem>

          <MenuItem
            icon={<i className="bi bi-columns-gap"></i>}
            component={<Link to="/rooms-list" />}
          >
            Rooms
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-columns-gap"></i>}
            component={<Link to="/ads-list" />}
          >
            Ads
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-columns-gap"></i>}
            component={<Link to="/booking-list" />}
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
            component={<Link to="/change-password" />}
          >
            Change Password
          </MenuItem>
          <MenuItem
            icon={<i className="bi bi-box-arrow-right"></i>}
            component={<Link to="/" />}
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
