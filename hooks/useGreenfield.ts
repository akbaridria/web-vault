import { api, queryClient } from "@/lib/utils";
import type { GetPostsParams, PostsResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetPosts = ({
	page = 1,
	limit = 10,
	x_handle,
}: GetPostsParams = {}) => {
	return useQuery<PostsResponse>({
		queryKey: ["posts", { page, limit, x_handle }],
		queryFn: async () => {
			const params = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
				...(x_handle && { x_handle }),
			});
			const response = await api.get<PostsResponse>(
				`/api/posts?${params.toString()}`,
			);
			return response;
		},
	});
};

const useCreateObject = () => {
	return useMutation({
		mutationFn: (tweet_url: string) =>
			api.post<unknown>("/api/scrape", { tweet_url }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};

export { useCreateObject, useGetPosts };
