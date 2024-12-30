import { getObject } from "@/lib/greenfield";
import type { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const id = params.id;
		if (!id) {
			return new Response(JSON.stringify({ error: "Missing id parameter" }), {
				status: 400,
			});
		}

		const imageBlob = await getObject(id);
		if (!imageBlob) throw new Error("Image not found");

		const arrayBuffer = await imageBlob.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		return new Response(buffer, {
			status: 200,
			headers: {
				"Content-Type": "image/png",
				// "Cache-Control": "public, max-age=31536000",
			},
		});
	} catch (error) {
		console.error("Error fetching image:", error);
		return new Response(JSON.stringify({ error: "Failed to fetch image" }), {
			status: 500,
		});
	}
}
