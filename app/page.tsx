"use client";

import DetailCardPost from "@/components/detail-card-post";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useFavorites } from "@/hooks/useFavorites";
import { useGetPosts } from "@/hooks/useGreenfield";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
	const [search, setSearch] = useState("");
	const [showFavorites, setShowFavorites] = useState(false);
	const { favorites } = useFavorites();
	const debouncedSearch = useDebounce(search, 500);
	const { data, isLoading } = useGetPosts({
		page: 1,
		limit: 9999,
		x_handle: debouncedSearch.replaceAll("@", "").toLowerCase() || undefined,
	});
	const filteredPosts = showFavorites
		? data?.data?.filter((post) => favorites.includes(post.id))
		: data?.data;
	return (
		<div className="space-y-6 h-full p-5">
			<Navigation />
			<div className="flex items-center gap-2 sticky top-0 z-10 bg-background py-5">
				<Input
					placeholder="Search by X/Twitter handle e.g. @elonmusk"
					className="sm:w-[30%]"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button
					variant={showFavorites ? "secondary" : "ghost"}
					className="border border-dashed"
					onClick={() => setShowFavorites((prev) => !prev)}
				>
					<HeartIcon />
					<span>Your Favorite</span>
				</Button>
			</div>
			<div className="w-full">
				<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
					{!isLoading &&
						filteredPosts?.map((item) => (
							<DetailCardPost key={item.id} detailPost={item} />
						))}
				</div>
			</div>
		</div>
	);
}
