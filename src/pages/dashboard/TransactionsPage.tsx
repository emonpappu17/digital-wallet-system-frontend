import { useUserProfileQuery } from "@/redux/features/authApi";
import AdminTransactionPage from "./admin/AdminTransactionPage";
import UserTransactionPage from "./user/UserTransactionPage";
import AgentTransactionPage from "./agent/AgentTransactionPage";

const TransactionsPage = () => {
    const { data } = useUserProfileQuery(undefined);
    const role = data?.data?.role
    return (
        <div>

            {/* {role === "AGENT" && } */}
            {role === "ADMIN" && <AdminTransactionPage />}
            {role === "USER" && <UserTransactionPage />}
            {role === "AGENT" && <AgentTransactionPage />}
        </div>
    );
};

export default TransactionsPage;