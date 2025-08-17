import { Outlet } from "react-router-dom";
import BottomNavbar from "../../components/Shared/BottomNavbar/Bottomnavbar";
import Navbar from "../../components/Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <BottomNavbar />
    </div>
  );
};

export default MainLayout;
