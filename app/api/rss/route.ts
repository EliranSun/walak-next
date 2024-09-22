import { NextRequest } from "next/server";

// export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	const urls = [
		"https://www.ynet.co.il/Integration/StoryRss1854.xml",
		"https://www.wired.com/feed/rss",
	];

	const responses = await Promise.all(
		urls.map((url) => fetch(url, { cache: "no-store" }))
	);
	const feeds = await Promise.all(responses.map((res) => res.text()));

	return new Response(feeds.join("\n"), {
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "no-store, max-age=0",
		},
	});
}
