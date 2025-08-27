import { useUserProfileQuery } from "@/redux/features/authApi";
import UserDashboardPage from "./user/UserDashboardPage";
import AgentDashboardPage from "./agent/AgentDashboardPage";

const DashboardPage = () => {
    const { data } = useUserProfileQuery(undefined);
    const role = data?.data?.role
    return (
        <div>
            {role === "AGENT" && <AgentDashboardPage />}
            {role === "ADMIN" && <UserDashboardPage />}
            {role === "USER" && <UserDashboardPage></UserDashboardPage>}

            {/* <DemoAgent></DemoAgent> */}
        </div>
    );
};

export default DashboardPage;