import { ArchiveIcon, GithubIcon } from "lucide-react";
import { FormAddArchive } from "./form-add-archive";
import { Typography } from "./typography";
import { Button } from "./ui/button";

const Navigation = () => {
	return (
		<div className="fixed bottom-0 md:bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[400px] border border-muted bg-background z-10 rounded-lg p-1">
			<div className="flex items-center justify-between gap-4">
				<div className="bg-secondary p-2 rounded-md flex items-center gap-2">
					<ArchiveIcon size={14} />
					<Typography variant="p3">X-Archive</Typography>
				</div>
				<div className="flex items-center gap-1">
					<Button size="icon" variant="ghost" disabled>
						<GithubIcon size={12} />
					</Button>
					<FormAddArchive />
				</div>
			</div>
		</div>
	);
};

export default Navigation;
