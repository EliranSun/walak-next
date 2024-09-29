import { NextRequest, NextResponse } from "next/server";
import { parseString } from "xml2js";
import { promisify } from "util";

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

export async function GET() {
	interface RssResult {
		rss: {
			channel: [
				{
					language: string[];
					item: Array<{
						title: string[];
						link: string[];
						description: string[];
						pubDate: string[];
						language: string[];
					}>;
				}
			];
		};
	}

	const urls = [
		"https://www.ynet.co.il/Integration/StoryRss1854.xml",
		"https://www.wired.com/feed/rss",
		"https://www.wired.com/feed/category/business/latest/rss",
		"https://feeds.bbci.co.uk/news/world/rss.xml",
		"https://www.washingtontimes.com/rss/headlines/news/world",
		"https://www.geektime.co.il/feed/",
		"https://www.calcalist.co.il/GeneralRSS/0,16335,L-8,00.xml",
		"https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=2",
		"https://www.theverge.com/rss/index.xml",
		"https://globalnews.ca/feed/",
	];

	const responses = await Promise.all(
		urls.map((url) => fetch(url, { cache: "no-store" }))
	);

	const feeds = await Promise.all(responses.map((res) => res.text()));
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
			console.log({ sanitizedFeed });

			try {
				const result = (await parseXml(sanitizedFeed)) as RssResult;
				console.log({ result });
				return result.rss.channel[0].item.map((item) => {
					return {
						link: item.link[0],
						title: escapeHtml(removeHtmlTags(removeUnicode(item.title[0]))),
						description: escapeHtml(
							removeHtmlTags(removeUnicode(item.description[0]))
						),
						pubDate: item.pubDate[0],
						language: result.rss.channel[0].language[0],
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

	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [{ role: "user", content: prompt }],
		});

		const answer =
			completion.choices[0]?.message?.content ||
			"Unable to generate an answer.";

		return NextResponse.json(
			{ answer, prompt },
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
