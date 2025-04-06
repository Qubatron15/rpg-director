import { CONFIG } from '@/app/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SceneData } from './scenesListSlice';
import { createSelector } from '@reduxjs/toolkit';

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
        }),
        deleteScene: builder.mutation({
            query: (sceneId: string) => ({
                url: `scenes/${sceneId}`,
                method: 'DELETE'
            })
        }),
        updateScene: builder.mutation({
            query: ({ id, name, description, soundtrack, image }: SceneData) => {
                const body: Omit<SceneData, 'id'> = {
                    name,
                    description,
                    soundtrack,
                    image
                }
                return {
                    url: `scenes/${id}`,
                    method: 'PATCH',
                    body
                }
            }
        })
    })
});

export const selectIsGlobalLoading = createSelector(
    (state) => state[mongoDbApi.reducerPath],
    (apiState) =>
        Object.values(apiState.queries).some((query: any) => query?.status === "pending") ||
        Object.values(apiState.mutations).some((mutation: any) => mutation?.status === "pending")
);

export const {
    useGetAllScenesQuery,
    useLazyGetAllScenesQuery,
    useAddNewSceneMutation,
    useDeleteSceneMutation,
    useUpdateSceneMutation
} = mongoDbApi;