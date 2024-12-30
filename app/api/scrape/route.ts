import { createPost } from "@/db/operations";
import { createAndUploadObject } from "@/lib/greenfield";
import puppeteer from "puppeteer";
import { z } from "zod";

const requestSchema = z.object({
	tweet_url: z
		.string()
		.min(1, { message: "Tweet URL is required" })
		.url({ message: "Invalid URL format" })
		.regex(/^https?:\/\/(twitter|x)\.com\/\w+\/status\/\d+$/, {
			message: "Must be a valid X/Twitter status URL",
		}),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { tweet_url } = requestSchema.parse(body);

		const browser = await puppeteer.launch({ headless: true });
		const [page] = await browser.pages();
		const ua =
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36";
		await page.setUserAgent(ua);
		await page.setViewport({
			width: 390,
			height: 844,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
		});

		await page.goto(tweet_url, {
			waitUntil: "networkidle2",
		});

		await page.waitForSelector("article", { timeout: 5000 }).catch(() => {
			throw new Error("Tweet not found or is from a protected account");
		});

		const tweetData = await page.evaluate((url) => {
			const article = document.querySelector("article");
			if (!article) {
				throw new Error("Tweet content not found");
			}

			document.body.innerHTML = "";
			document.body.appendChild(article);

			const tweetText = article.querySelector(
				'[data-testid="tweetText"]',
			)?.textContent;
			const timestamp = article.querySelector("time")?.getAttribute("datetime");
			if (!timestamp) {
				throw new Error(
					`Invalid tweet content or timestamp ${tweetText} ${timestamp}`,
				);
			}

			const urlMatch = url.match(
				/^https?:\/\/(twitter|x)\.com\/(\w+)\/status\/(\d+)$/,
			);

			if (!urlMatch)
				throw new Error("Could not extract username and status ID from URL");

			const username = urlMatch[2];
			const statusId = urlMatch[3];

			return {
				content: tweetText,
				timestamp: new Date(timestamp).getTime() / 1000,
				username,
				statusId,
			};
		}, tweet_url);

		const element = await page.$("article");
		if (!element) throw new Error("Tweet element not found");

		const screenshot = await element.screenshot({
			type: "png",
			encoding: "binary",
			optimizeForSpeed: false,
			omitBackground: false,
		});

		await browser.close();

		if (!tweetData || !tweetData.username || !tweetData.timestamp) {
			throw new Error("Invalid tweet data extracted");
		}

		if (!screenshot) {
			throw new Error("Failed to capture PNG snapshot");
		}

		await createPost({
			content: tweetData.content ?? "",
			file_name: `tweet-${tweetData.username}-${tweetData.timestamp}.png`,
			timestamp: tweetData.timestamp,
			x_handle: tweetData.username,
			id: tweetData.statusId,
		}).catch((error) => {
			console.error("Store error", error);
			throw new Error("Failed to store metadata");
		});

		const uploadRes = await createAndUploadObject(
			tweetData.username,
			tweetData.timestamp,
			Buffer.from(screenshot),
		).catch((error) => {
			console.error("Upload error:", error);
			throw new Error("Failed to upload to Greenfield");
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: "success",
				uploadResult: uploadRes,
				metadata: tweetData,
			}),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			},
		);
	} catch (error) {
		console.error("Error:", error);
		return new Response(
			JSON.stringify({
				success: false,
				message:
					error instanceof Error ? error.message : "Unknown error occurred",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
