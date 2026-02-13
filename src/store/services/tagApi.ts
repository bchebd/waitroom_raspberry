import { api } from "@/store/services/api";
import type { Tag, User } from "@/types/entity.types";

export const tagApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query<Tag[], void>({
            query: () => "ticket",
            providesTags: (result) =>
                result ?
                [
                    ...result.map((tag) => ({ type: "Tag" as const, id: tag.id })),
                    { type: "Tag", id: "LIST"}
                ] :
                [
                    { type: "Tag", id: "LIST"}
                ]
        }),
        getUsers: builder.query<User[], void>({
            query: () => "users",
            providesTags: (result) => 
                result ? 
                [
                    ...result.map((user) => ({ type: "User" as const, id: Number(user.id) })),
                    { type: "User", id: "LIST"}
                ] :
                [
                    { type: "User", id: "LIST"}
                ]
        })
    }),
    overrideExisting: false, 
});

export const { useGetTagsQuery, useGetUsersQuery } = tagApi;