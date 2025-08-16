import { Outlet } from "react-router-dom";
import BottomNavbar from "../../components/Shared/BottomNavbar/Bottomnavbar";

const MainLayout = () => {
    return (
        <div>
            <Outlet/>
            <BottomNavbar/>
        </div>
    );
};

export default MainLayout;