import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "../hook/getEnv";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5ODFkZDJhLTJkMzQtNDgxOS1hYTVmLTgxNjQwYTNiNjRlZiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MTYyMzkyMywiZXhwIjoxNzUyMjI4NzIzfQ.q6-tZlfguJCDAPREAafuPUAtOVWL7L3xE4mbSovG57E"

export const stacksApi = createApi({
    reducerPath: "stacksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API
    }),
    tagTypes: ["Stacks"],
    endpoints: (builder => ({
        getAllStacks: builder.query({
            query: () => ({
                method: "get",
                url: "/stacks",
                headers: { "Authorization": `Bearer ${token}` }
            }),
            providesTags: ["Stacks"]
        }),
        deleteStacks: builder.mutation({
            query: (id: number) => ({
                url: `/stacks/${id}`,
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            }),
            invalidatesTags: ["Stacks"]
        }),
        createStack: builder.mutation({
            query: (body: { name: string; image?: any, createdAt: any }) => ({
                url: "/stacks",
                method: "POST",
                body,
                headers: { "Authorization": `Bearer ${token}` }
            }),
            invalidatesTags: ["Stacks"]
        }),
        updateStack: builder.mutation({
            query: ({ id, ...body }: { id: number; name?: string; image?: any, createdAt: any }) => ({
                url: `/stacks/${id}`,
                method: "PATCH",
                body,
                headers: { "Authorization": `Bearer ${token}` }
            }),
            invalidatesTags: ["Stacks"]
        })
    }))
})

export const {
    useGetAllStacksQuery,
    useDeleteStacksMutation,
    useCreateStackMutation,
    useUpdateStackMutation
} = stacksApi