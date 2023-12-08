import {NextResponse} from "next/server";
import OpenAI from "openai";
import {sql} from "@vercel/postgres";

const openai = new OpenAI({
    apiKey: "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",
});

const firstChapterPrompt = ({
    title,
    siblingName,
    siblingType,
    feeling,
    genre
}: {
    title: string,
    siblingName: string,
    siblingType: string,
    feeling: string,
    genre: string
}) => `
   You are a professional storyteller.
   Create a short first chapter for a story with a title of "${title}".
   This is chapter 1 out of 7.
   The chapter will include me, Eliran, and my ${siblingType} ${siblingName}.
   The chapter should encapsulate the feeling of being ${feeling} and the genre should be ${genre}.
   Limit the chapter to around 500 characters.
   Use simple language/terminology!
   Output nothing but the story chapter!`;

const nthChapterPrompt = ({
    title,
    chapterNumber,
    previousChapter,
    siblingType,
    siblingName,
    currentTime,
    feeling,
    genre
}: {
    title: string,
    chapterNumber: number,
    previousChapter: string,
    siblingType: string,
    siblingName: string,
    currentTime: string,
    feeling: string,
    genre: string
}) => `
    You are a professional storyteller.
    Create a chapter for a story with a title of "${title}", and based of the previous chapter below.
    This is chapter number ${chapterNumber} out of 7.
    This chapter should include me, Eliran, and my ${siblingType} ${siblingName}.
    The chapter should encapsulate the feeling of being ${feeling} and the genre should be ${genre}.
    In addition include the current time - ${currentTime} - somehow in the chapter.
    Limit the chapter to around 400 characters.
    Use simple language/terminology!
    Output nothing but the story chapter!
   
    Previous chapter:
    ${previousChapter}`;

export async function POST(request: Request) {
    let requestJSON;
    try {
        requestJSON = await request.json();
    } catch (error) {
        return NextResponse.json({
            error: "Invalid request JSON"
        });
    }

    const {
        title,
        siblingName,
        currentTime,
        genre,
        feeling
    } = requestJSON;

    if (!siblingName || !currentTime) {
        return NextResponse.json({error: "chapterNumber, siblingName, and currentTime are required"})
    }

    const {rows: existingChapter} = await sql`
        SELECT * FROM chapters WHERE title = ${title} AND sibling = ${siblingName}
    `;

    const existingTitle = existingChapter[0]?.title;
    const previousChapter = existingChapter[0]?.content;
    const existingFeeling = existingChapter[0]?.feeling;
    const existingGenre = existingChapter[0]?.genre;
    const currentChapterNumber = existingChapter[0]?.chapter_number;
    const nextChapterNumber = currentChapterNumber ? currentChapterNumber + 1 : 1;

    if (nextChapterNumber > 7) {
        return NextResponse.json({error: "Final chapter number reached, call /reset-story to generate a new story"});
    }

    if (!existingChapter[0] && (!genre || !feeling)) {
        return NextResponse.json({error: "genre and feeling are required for first time chapter generation"});
    }

    console.info({
        existingTitle,
        previousChapter,
        existingFeeling,
        existingGenre,
        title,
        siblingName,
        currentTime,
        genre,
        feeling,
        nextChapterNumber
    });

    const siblingType = ["or", "yahel"].includes(siblingName.toLowerCase()) ? "brother" : "sister";
    let completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{
            role: "system",
            content: existingChapter ?
                nthChapterPrompt({
                    siblingType,
                    siblingName,
                    currentTime,
                    chapterNumber: nextChapterNumber,
                    title: existingTitle || title,
                    previousChapter: previousChapter,
                    feeling: existingFeeling || feeling,
                    genre: existingGenre || genre
                }) :
                firstChapterPrompt({
                    title,
                    siblingName,
                    siblingType,
                    feeling,
                    genre
                })
        }],
    });

    console.time("GET");
    const client = await sql.connect();
    const newChapter = completion.choices[0]?.message?.content || "";

    await client.sql`
        INSERT INTO chapters (title, chapter_number, content, sibling, emotion, genre)
        VALUES (${title}, ${nextChapterNumber}, ${newChapter}, ${siblingName}, ${feeling}, ${genre})
    `;

    client.release();
    console.timeEnd("GET");

    return NextResponse.json({
        title: existingTitle,
        chapter: newChapter,
        previousChapter,
        feeling: existingFeeling || feeling,
        genre: existingGenre || genre,
        currentChapterNumber,
        nextChapterNumber
    });
}