import { useMemo } from "react";

import { useGetTagsQuery, useGetUsersQuery } from "@/store/services/tagApi";

export const useTicketTable = () => {
    const { data: tags, isLoading: isLoadingT, isError: isErrorT, error: errorT,  } = useGetTagsQuery(undefined, { pollingInterval: 6000 });
    const { data: users, isLoading: isLoadingU, isError: isErrorU, error: errorU,  } = useGetUsersQuery(undefined, { pollingInterval: 6000 });
    

    const rows = useMemo(() => { 
        if (isLoadingT || !tags) return [];

        return tags.map((tag) => {
            let userName: string = "—";

            if (!isLoadingU && users?.length)  {
                const user = users.find(user => Number(user.id) === tag.userId);
                userName = user?.name ?? "—";
            }

            return (
                <tr key={tag.id}>
                    <td>{tag.id}</td>
                    <td>{userName}</td>
                </tr>
            );
        });
    }, [isLoadingT, isLoadingU, tags, users]);

    const sliced = rows.slice(0, 15);

    return {
        sliced,
        tags,
        isLoadingT,
        isLoadingU,
        isErrorT,
        isErrorU,
        errorT,
        errorU
    };
};