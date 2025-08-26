import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["USER"]
        }),
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
        getUser: builder.mutation({
            query: (userInfo) => ({
                url: "/user/get-user",
                method: "POST",
                data: userInfo
            })
        }),
        getAgent: builder.mutation({
            query: (agentInfo) => ({
                url: "/agent-requests/get-agent",
                method: "POST",
                data: agentInfo
            })
        }),
        userProfile: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET"
            }),
            providesTags: ['USER']
        }),

    })
})

export const { useGetAgentMutation, useUserProfileQuery, useLogoutMutation, useLoginMutation, useRegisterUserMutation, useRegisterAgentMutation, useGetUserMutation } = authApi;