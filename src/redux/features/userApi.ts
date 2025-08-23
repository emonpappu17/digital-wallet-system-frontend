import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
            query: () => ({
                url: "/admin/agents",
                method: "GET"
            }),
            providesTags: ['USER']
        })
    })
})

export const { useGetAllAgentsQuery, useApproveAgentMutation, useSuspendAgentMutation } = userApi;