/* eslint-disable @next/next/no-img-element */
import type { Post } from "@/db/schema";
import { useFavorites } from "@/hooks/useFavorites";
import { CopyIcon, ExternalLinkIcon, HeartIcon } from "lucide-react";
import { toast } from "sonner";
import ImageWithFallback from "./image-with-fallback";
import { Button } from "./ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

const DetailCardPost: React.FC<{ detailPost: Post }> = ({ detailPost }) => {
	const { favorites, toggleFavorite } = useFavorites();
	const isFavorite = favorites.includes(detailPost.id);

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(
				`${window.location.origin}/api/posts/${detailPost.file_name}`,
			);
			toast.success("Link copied to clipboard");
		} catch (err) {
			console.error(err);
			toast.error("Failed to copy link");
		}
	};

	return (
		<div className="break-inside-avoid border rounded-lg space-y-2 mb-4">
			<div className="flex items-center justify-end px-4 py-2">
				<div className="flex items-center gap-1">
					<TooltipProvider delayDuration={200}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
									onClick={() => toggleFavorite(detailPost.id)}
								>
									<HeartIcon
										size={16}
										className={isFavorite ? "fill-current" : ""}
									/>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									{isFavorite ? "Remove from favorites" : "Add to favorites"}
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider delayDuration={200}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
									onClick={handleCopyLink}
								>
									<CopyIcon size={8} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Copy link</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider delayDuration={200}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
									onClick={() =>
										window.open(
											`${window.location.origin}/api/posts/${detailPost.file_name}`,
											"_blank",
										)
									}
								>
									<ExternalLinkIcon size={16} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Open in new tab</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
			<ImageWithFallback
				src={`/api/posts/${detailPost.file_name}`}
				alt={`Tweet from ${detailPost.x_handle}`}
			/>
		</div>
	);
};

export default DetailCardPost;
