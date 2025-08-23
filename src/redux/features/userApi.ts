import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // mutation: builder.mutation({
        //     query: (agentInfo) => ({
        //         url: "/agent-requests",
        //         method: "POST",
        //         data: agentInfo
        //     }),
        //     invalidatesTags: ["USER"]
        // }),
        getAllAgents: builder.query({
            query: () => ({
                url: "/admin/agents",
                method: "GET"
            }),
            providesTags: ['USER']
        })
    })
})

export const { useGetAllAgentsQuery } = userApi;