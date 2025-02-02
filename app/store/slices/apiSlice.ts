import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mongoDbApi = createApi({
    reducerPath: 'mongoDbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (builder) => ({
        getAllScenes: builder.query({
            query: () => 'products'
        })
    })
});

export const { useGetAllScenesQuery } = mongoDbApi;