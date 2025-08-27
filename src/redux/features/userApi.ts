import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (params) => ({
                url: "/admin/users",
                method: "GET",
                params
            }),
            providesTags: ['USER']
        }),

        blockUser: builder.mutation({
            query: (userId) => ({
                url: `/user/${userId}/block`,
                method: "PATCH",
            }),
            invalidatesTags: ["USER"]
        }),

        unblockUser: builder.mutation({
            query: (userId) => ({
                url: `/user/${userId}/unblock`,
                method: "PATCH",
            }),
            invalidatesTags: ["USER"]
        }),

        approveAgent: builder.mutation({
            query: (agentId) => ({
                url: `/agent-requests/${agentId}/approve`,
                method: "PATCH",
                // data: agentInfo
            }),
            invalidatesTags: ["USER"]
        }),

        suspendAgent: builder.mutation({
            query: (agentId) => ({
                url: `/agent-requests/${agentId}/suspend`,
                method: "PATCH",
                // data: agentInfo
            }),
            invalidatesTags: ["USER"]
        }),

        getAllAgents: builder.query({
            query: (params) => ({
                url: "/admin/agents",
                method: "GET",
                params
            }),
            providesTags: ['USER']
        }),
        getUserStats: builder.query({
            query: (params) => ({
                url: "/user/user-stats",
                method: "GET",
                params
            }),
            providesTags: ['USER']
        }),
        getAgentStats: builder.query({
            query: (params) => ({
                url: "/agent-requests/agent-stats",
                method: "GET",
                params
            }),
            providesTags: ['USER']
        }),
        getAllUsersStats: builder.query({
            query: (params) => ({
                url: "/admin/all-user-stats",
                method: "GET",
                params
            }),
            providesTags: ['USER']
        })
    })
})

export const { useGetAllUsersStatsQuery, useGetAgentStatsQuery, useGetAllAgentsQuery, useApproveAgentMutation, useSuspendAgentMutation, useGetAllUsersQuery, useBlockUserMutation, useUnblockUserMutation, useGetUserStatsQuery } = userApi;