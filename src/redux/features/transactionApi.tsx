import { baseApi } from "../baseApi";

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendMoney: builder.mutation({
            query: (receiverData) => ({
                url: "/transactions/send-money",
                method: "POST",
                data: receiverData
            }),
            invalidatesTags: ["WALLET"]
        }),
        cashOut: builder.mutation({
            query: (agentData) => ({
                url: "/transactions/cash-out",
                method: "POST",
                data: agentData
            }),
            invalidatesTags: ["WALLET"]
        }),

        depositMoney: builder.mutation({
            query: (receiverData) => ({
                url: "/transactions/add-money",
                method: "POST",
                data: receiverData
            }),
            invalidatesTags: ["WALLET"]
        }),
        cashIn: builder.mutation({
            query: (userData) => ({
                url: "/transactions/cash-in",
                method: "POST",
                data: userData
            }),
            invalidatesTags: ["WALLET"]
        }),

    })
})

export const { useCashInMutation, useCashOutMutation, useSendMoneyMutation, useDepositMoneyMutation } = transactionApi;