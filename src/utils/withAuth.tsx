import { useUserProfileQuery } from "@/redux/features/authApi"
import { IRole } from "@/types"
import { ComponentType } from "react"
import { Navigate } from "react-router"

export const withAuth = (Component: ComponentType, requireRole?: IRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserProfileQuery(undefined);

        if (!isLoading && !data?.data?.email) {
            return <Navigate to={"/login"} />
        }

        if (requireRole && !isLoading && (requireRole !== data?.data?.role)) {
            return <Navigate to={"/unauthorized"}></Navigate>
        }

        return <Component />
    }
}