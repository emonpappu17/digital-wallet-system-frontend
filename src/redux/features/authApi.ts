import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            }),
            invalidatesTags: ["USER"]
        }),
        registerAgent: builder.mutation({
            query: (agentInfo) => ({
                url: "/agent-requests",
                method: "POST",
                data: agentInfo
            }),
            invalidatesTags: ["USER"]
        }),
    })
})

export const { useRegisterUserMutation } = authApi;