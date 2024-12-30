import { bigint, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
	id: varchar("id", { length: 256 }).notNull().primaryKey(),
	file_name: varchar("file_name").notNull(),
	x_handle: varchar("x_handle").notNull(),
	content: text("content").notNull(),
	timestamp: bigint("timestamp", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
