import { CONFIG } from '@/app/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mongoDbApi = createApi({
    reducerPath: 'mongoDbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://us-east-2.aws.neurelo.com/rest',
        prepareHeaders: (headers, { getState }) => {
            headers.set('X-API-KEY', CONFIG.API_CONNECTION_STRING)
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