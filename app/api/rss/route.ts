import { NextRequest, NextResponse } from "next/server";
import { parseString } from "xml2js";
import { promisify } from "util";
import { get } from "lodash";
// @ts-ignore
import Crawler from "crawler";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

function removeUnicode(text: string) {
	return text
		.replaceAll("&#8226;", "•")
		.replaceAll("&#34;", '"')
		.replaceAll("&#8230;", "...")
		.replaceAll("&#8211;", "-")
		.replaceAll("&#039;", "'")
		.replaceAll("&amp;", "&")
		.replaceAll("&quot;", '"')
		.replaceAll("&bull;", "•")
		.replaceAll("&nbsp;", " ")
		.replaceAll("&lt;", "<")
		.replaceAll("&gt;", ">")
		.replaceAll("&apos;", "'");
}


interface RssResult {
	rss: {
		channel: [
			{
				language: string[];
				title: string[];
				item: Array<{
					title: string[];
					link: string[];
					description: string[];
					pubDate: string[];
					language: string[];
					feedName: string[];
				}>;
			}
		];
	};
}

export async function GET() {
	// let test = [];
	// const c = new Crawler({ maxConnections: 10 });
	// const crawlerResponse = await c.send("https://www.geektime.co.il/feed/");

	const urls = [
		// "https://www.ynet.co.il/Integration/StoryRss1854.xml",
		"https://www.ynet.co.il/Integration/StoryRss2.xml",
		"https://www.wired.com/feed/rss",
		"https://www.wired.com/feed/category/business/latest/rss",
		"https://feeds.bbci.co.uk/news/world/rss.xml",
		"https://www.washingtontimes.com/rss/headlines/news/world",
		"https://www.calcalist.co.il/GeneralRSS/0,16335,L-8,00.xml",
		"https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=2",
		"https://www.theverge.com/rss/index.xml",
		"https://globalnews.ca/feed/",
		"https://9to5mac.com/feed/",
		"https://pcmag.com/feeds/rss/latest",
		"https://old.reddit.com/r/news/",
	];

	const responses = await Promise.all(
		urls.map((url) => fetch(url))
	);

	const feeds = await Promise.all([
		...responses.map((res) => res.text()),
		// crawlerResponse.body
	]);
	const parseXml = promisify(parseString);

	// Add this function to sanitize XML
	function sanitizeText(text: string): string {
		return text.replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "");
	}

	function escapeHtml(text: string): string {
		return text.replace(/&/g, "&amp;");
	}

	function removeHtmlTags(text: string): string {
		return text.replace(/<[^>]*>?/g, "");
	}

	const parsedFeeds = await Promise.all(
		feeds.map(async (feed) => {
			const sanitizedFeed = sanitizeText(escapeHtml(feed));

			try {
				const result = (await parseXml(sanitizedFeed)) as RssResult;
				const feed =
					get(result, "rss.channel[0].item") ||
					get(result, "channel[0].item") ||
					get(result, "channel.item") || [];

				return feed.map((item) => {
					return {
						link: item.link[0],
						title: escapeHtml(removeHtmlTags(removeUnicode(item.title[0]))),
						description: escapeHtml(removeHtmlTags(removeUnicode(item.description[0]))),
						pubDate: item.pubDate[0],
						language: result.rss.channel[0].language[0],
						feedName: result.rss.channel[0].title[0] || new URL(item.link[0]).hostname.replace("www.", "")
					};
				});
			} catch (error) {
				console.trace("Error parsing feed:", error);
				return [];
			}
		})
	);

	const jsonResponse = parsedFeeds.flat();

	const sortedFeeds = jsonResponse.sort((a, b) => {
		const dateA = new Date(a.pubDate);
		const dateB = new Date(b.pubDate);
		return dateB.getTime() - dateA.getTime(); // Sort in descending order (newest first)
	});

	return NextResponse.json(sortedFeeds, {
		headers: {
			"Cache-Control": "no-store, max-age=0",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		},
	});
}

export async function POST(request: NextRequest) {
	const OpenAI = require("openai");
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const { question, link, title } = await request.json();

	if (!link || !title) {
		return NextResponse.json(
			{ error: "Missing question or link or title" },
			{
				status: 400,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		);
	}

	const prompt = `
	Answer the following question using the information in this article/website. If you cannot access the link or article, answer from your knowledge or search the internet. Make the answer short - no longer than 40 words. Also if you cannot access the link, do not state so - just answer the question. if no question provided, just summarize the article. Question: "${question}" article link: ${link} article title: "${title}".`;

	const prompt2 = `
Explain everything in the following title simply.
assume no previous knowledge exists, so explain idioms, concepts, ideas, notions, etc. 
Explain the history as well as far as your knowledge goes. what led up to this point. who is involved,
what is at stakes, etc. bottom line is - as a reader i need to fully understand the title and context 
after reading your explanation.

Title: "${title}"
`;

	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [{ role: "user", content: prompt2 }],
		});

		const answer =
			completion.choices[0]?.message?.content ||
			"Unable to generate an answer.";

		return NextResponse.json(
			{ answer, prompt2 },
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		);
	} catch (error) {
		console.error("Error querying OpenAI:", error);
		return NextResponse.json(
			{ error: "Failed to generate an answer" },
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		);
	}
}
