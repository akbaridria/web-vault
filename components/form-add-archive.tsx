"use client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useCreateObject } from "@/hooks/useGreenfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlusIcon, LoaderIcon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

const formSchema = z.object({
	tweet_url: z
		.string()
		.min(1, { message: "Tweet URL is required" })
		.url({ message: "Invalid URL format" })
		.regex(/^https?:\/\/(twitter|x)\.com\/\w+\/status\/\d+$/, {
			message: "Must be a valid X/Twitter status URL",
		}),
});

export const FormAddArchive = () => {
	const [open, setOpen] = useState(false);
	const { mutate, isPending, isSuccess, isError } = useCreateObject();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		disabled: isPending,
	});

	useEffect(() => {
		if (!isPending && isError)
			toast.error(
				"Failed to archive tweet. Please try again or check if the tweet is public.",
			);
		if (!isPending && isSuccess) {
			toast.success("Tweet successfully archived and stored!");
			setOpen(false);
		}
	}, [isPending, isError, isSuccess]);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values.tweet_url);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<TooltipProvider delayDuration={200}>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button size="icon" variant="ghost">
								<CirclePlusIcon size={12} />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Add new archive</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DialogContent className="sm:max-w-[650px]">
				<DialogHeader>
					<DialogTitle>Add New Archive</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Alert>
						<TriangleAlertIcon className="h-4 w-4" />
						<AlertTitle>Heads up!</AlertTitle>
						<AlertDescription className="text-muted-foreground">
							You can archive any public X (formerly Twitter) tweets using their
							URL. However, tweets from protected accounts cannot be archived.
							Make sure the tweet you want to archive is from a public account.
						</AlertDescription>
					</Alert>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="tweet_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tweet URL</FormLabel>
									<FormControl>
										<Input
											placeholder="https://x.com/username/status/1234567890"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										The tweet URL is the full URL of an X/Twitter post (e.g., in
										https://x.com/username/status/1234567890)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-end pt-4">
							<Button type="submit" className="w-48" disabled={isPending}>
								{isPending && <LoaderIcon className="animate-spin" />}
								<div>{!isPending ? "Submit" : "It may take a minute"}</div>
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
