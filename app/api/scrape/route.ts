import puppeteer from "puppeteer";

export async function POST() {
	const browser = await puppeteer.launch({ headless: true });
	const [page] = await browser.pages();
	const ua =
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36";
	await page.setUserAgent(ua);

	await page.goto("this is the url", {
		waitUntil: "networkidle2",
	});

	const cdp = await page.createCDPSession();
	const { data } = await cdp.send("Page.captureSnapshot", { format: "mhtml" });

	await browser.close();

	return new Response(data, {
		status: 200,
		headers: {
			"Content-Type": "multipart/related",
			"Content-Disposition": `attachment; filename="page-${Date.now()}.mhtml"`,
		},
	});
}
