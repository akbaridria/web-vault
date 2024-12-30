import type { Post } from "@/db/schema";

export type ApiError = {
	message: string;
	success: boolean;
};

export interface PostsResponse {
	data: Post[];
	metadata: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface GetPostsParams {
	page?: number;
	limit?: number;
	x_handle?: string;
}

export interface TweetData {
	content: string;
	timestamp: number;
	username: string;
	statusId: string;
	imageUrl?: string;
}
