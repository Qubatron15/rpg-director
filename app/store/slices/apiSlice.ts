import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mongoDbApi = createApi({
    reducerPath: 'mongoDbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://us-east-2.aws.neurelo.com/rest',
        prepareHeaders: (headers, { getState }) => {
            headers.set('X-API-KEY', '')
            return headers
        }
    }),
    endpoints: (builder) => ({
        getAllScenes: builder.query({
            query: () => 'scenes',
        })
    })
});

export const { useGetAllScenesQuery } = mongoDbApi;