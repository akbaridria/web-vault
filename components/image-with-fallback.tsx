import { Skeleton } from "@/components/ui/skeleton";
/* eslint-disable @next/next/no-img-element */
import { AlertCircle } from "lucide-react";
import { useState } from "react";

interface ImageWithFallbackProps
	extends React.ImgHTMLAttributes<HTMLImageElement> {
	fallbackContent?: React.ReactNode;
}

const ImageWithFallback = ({
	alt,
	fallbackContent,
	...props
}: ImageWithFallbackProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	return (
		<div className="relative w-full">
			{isLoading && <Skeleton className="w-full h-64 rounded-lg" />}

			{hasError ? (
				fallbackContent || (
					<div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted space-y-2">
						<AlertCircle className="w-8 h-8 text-muted-foreground" />
						<p className="text-sm text-muted-foreground">
							Failed to load image
						</p>
					</div>
				)
			) : (
				<img
					{...props}
					alt={alt}
					className={`w-full rounded-lg ${isLoading ? "hidden" : ""}`}
					onLoad={() => setIsLoading(false)}
					onError={() => {
						setIsLoading(false);
						setHasError(true);
					}}
				/>
			)}
		</div>
	);
};

export default ImageWithFallback;
