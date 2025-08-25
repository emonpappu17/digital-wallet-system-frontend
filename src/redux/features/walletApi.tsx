import { baseApi } from "../baseApi";

export const walletApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // getMyWallet: builder.mutation({
        //     query: (userInfo) => ({
        //         url: "/auth/login",
        //         method: "POST",
        //         data: userInfo
        //     })
        // }),

        getMyWallet: builder.query({
            query: () => ({
                url: "/wallet/my",
                method: "GET"
            }),
            providesTags: ['WALLET']
        })
    })
})

export const { useGetMyWalletQuery } = walletApi;