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

        depositMoney: builder.mutation({
            query: (receiverData) => ({
                url: "/transactions/add-money",
                method: "POST",
                data: receiverData
            }),
            invalidatesTags: ["WALLET"]
        }),


        // userProfile: builder.query({
        //     query: () => ({
        //         url: "/user/me",
        //         method: "GET"
        //     }),
        //     providesTags: ['USER']
        // }),

    })
})

export const { useSendMoneyMutation, useDepositMoneyMutation } = transactionApi;