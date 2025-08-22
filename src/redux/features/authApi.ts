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
        userProfile: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET"
            }),
            providesTags: ['USER']
        })
    })
})

export const { useUserProfileQuery, useLoginMutation, useRegisterUserMutation, useRegisterAgentMutation } = authApi;