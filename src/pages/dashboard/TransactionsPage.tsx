import { useUserProfileQuery } from "@/redux/features/authApi";
import AdminTransactionPage from "./admin/AdminTransactionPage";

const TransactionsPage = () => {
    const { data } = useUserProfileQuery(undefined);
    const role = data?.data?.role
    return (
        <div>

            {/* {role === "AGENT" && } */}
            {role === "ADMIN" && <AdminTransactionPage />}
            {/* {role === "USER" && <UserDashboardPage></UserDashboardPage>} */}
        </div>
    );
};

export default TransactionsPage;