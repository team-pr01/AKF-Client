import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="bg-gradient-to-r from-slate-50 to-orange-50/60">
            <Outlet/>
        </div>
    );
};

export default AuthLayout;