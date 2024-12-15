"use client";

import { ConnectButton } from "@/components/connect-button";
import { Typography } from "@/components/typography";
import { DataTable } from "./data-table";

export default function Home() {
	return (
		<div className="space-y-6 p-8 h-full">
			<div className="flex items-center justify-between">
				<div>
					<Typography variant="h3">Welcome Back</Typography>
					<Typography variant="p" className="text-muted-foreground">
						Here is your list of archived items.
					</Typography>
				</div>
				<ConnectButton />
			</div>
			<DataTable columns={[]} data={[]} />
		</div>
	);
}
