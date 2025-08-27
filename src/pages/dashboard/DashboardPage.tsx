import { useUserProfileQuery } from "@/redux/features/authApi";
import UserDashboardPage from "./user/UserDashboardPage";
import AgentDashboardPage from "./agent/AgentDashboardPage";
import AdminDashboardPage from "./admin/AdminDashboardPage";

const DashboardPage = () => {
    const { data } = useUserProfileQuery(undefined);
    const role = data?.data?.role
    return (
        <div>
            {role === "AGENT" && <AgentDashboardPage />}
            {role === "ADMIN" && <AdminDashboardPage />}
            {role === "USER" && <UserDashboardPage></UserDashboardPage>}

            {/* <DemoAgent></DemoAgent> */}
        </div>
    );
};

export default DashboardPage;