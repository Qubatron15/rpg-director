import { CONFIG } from '@/app/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SceneData } from './scenesListSlice';

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
        }),
        addNewScene: builder.mutation({
            query: (newSceneData: Omit<SceneData, 'id'>) => ({ 
                url: 'scenes/__one',
                method: 'POST',
                body: newSceneData,
            }),
        })
    })
});

export const { useGetAllScenesQuery, useAddNewSceneMutation } = mongoDbApi;