import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	const urls = [
		"https://www.ynet.co.il/Integration/StoryRss1854.xml",
		"https://www.wired.com/feed/rss",
		"https://www.wired.com/feed/category/business/latest/rss",
		"https://www.wired.com/feed/category/gear/latest/rss",
		"https://feeds.bbci.co.uk/news/world/rss.xml",
		"https://www.washingtontimes.com/rss/headlines/news/world",
		"https://www.geektime.co.il/feed/", // FIXME: Has other content type
		"https://www.calcalist.co.il/GeneralRSS/0,16335,L-8,00.xml",
		"https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=2",
	];

	const responses = await Promise.all(
		urls.map((url) => fetch(url, { cache: "no-store" }))
	);
	const feeds = await Promise.all(responses.map((res) => res.text()));

	return new Response(feeds.join("\n"), {
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "no-store, max-age=0",
			"Access-Control-Allow-Origin": "*",
		},
	});
}
