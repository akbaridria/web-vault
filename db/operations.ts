import { desc, ilike, sql } from "drizzle-orm";
import { db } from "./index";
import { type NewPost, posts } from "./schema";

export async function createPost(data: NewPost) {
	return db.insert(posts).values(data).returning();
}

export async function getAllPosts({
	page = 1,
	limit = 10,
	x_handle,
}: {
	page?: number;
	limit?: number;
	x_handle?: string;
}) {
	const offset = (page - 1) * limit;

	const query = db
		.select()
		.from(posts)
		.limit(limit)
		.offset(offset)
		.orderBy(desc(posts.timestamp));

	if (x_handle) {
		query.where(ilike(posts.x_handle, `%${x_handle}%`));
	}

	const [data, [{ count }]] = await Promise.all([
		query,
		db
			.select({
				count: sql<number>`cast(count(*) as integer)`,
			})
			.from(posts),
	]);

	return {
		data,
		metadata: {
			total: count,
			page,
			limit,
			totalPages: Math.ceil(count / limit),
		},
	};
}
