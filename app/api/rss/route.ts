import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});


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

export async function POST(request: NextRequest) {
    const { question, link, title } = await request.json();

    if (!link || !title) {
        return NextResponse.json({ error: "Missing question or link or title" }, { status: 400 });
    }

    const prompt = `
	Answer the following question using the information in this article/website. If you cannot access the link or article, answer from your knowledge or search the internet. Make the answer short - no longer than 40 words. Also if you cannot access the link, do not state so - just answer the question. if no question provided, just summarize the article. Question: "${question}" article link: ${link} article title: "${title}".`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
        });

        const answer = completion.choices[0]?.message?.content || "Unable to generate an answer.";

        return NextResponse.json({ answer, prompt });
    } catch (error) {
        console.error("Error querying OpenAI:", error);
        return NextResponse.json({ error: "Failed to generate an answer" }, { status: 500 });
    }
}