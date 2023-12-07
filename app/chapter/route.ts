import {NextResponse} from "next/server";
import OpenAI from "openai";
import {sql} from "@vercel/postgres";

const openai = new OpenAI({
    apiKey: "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",
});

const firstChapterPrompt = (title: string, siblingName: string, siblingType: string) => `
   You are a professional storyteller.
   Create a short first chapter for a story with a title of "${title}".
   This is chapter 1 out of 7.
   The story will include me, Eliran, and my ${siblingType} ${siblingName}.
   Limit the chapter to around 500 characters.
   Use simple language/terminology!
   Output nothing but the story chapter!`;

const nthChapterPrompt = ({
    title, chapterNumber, previousChapter, siblingType, siblingName, currentTime
}: {
    title: string,
    chapterNumber: number,
    previousChapter: string,
    siblingType: string,
    siblingName: string,
    currentTime: string
}) => `
   You are a professional storyteller.
   Create a chapter for a story with a title of "${title}", and based of the previous chapter below.
   This is chapter number ${chapterNumber} out of 7.
   This chapter should include me, Eliran, and my ${siblingType} ${siblingName}.
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
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    }

    const {
        title,
        chapterId,
        chapterNumber,
        siblingName,
        currentTime
    } = requestJSON;

    if (!chapterNumber || !siblingName || !currentTime) {
        return NextResponse.json({error: "chapterNumber, siblingName, and currentTime are required"})
    }

    const {rows: existingChapter} = await sql`
        SELECT * FROM chapters WHERE id = ${chapterId} AND chapter_number = ${chapterNumber}
    `;

    const siblingType = ["or", "yahel"].includes(siblingName.toLowerCase()) ? "brother" : "sister";
    let completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{
            role: "system",
            content: existingChapter ?
                nthChapterPrompt({
                    title,
                    chapterNumber,
                    previousChapter: existingChapter[0].content,
                    siblingType,
                    siblingName,
                    currentTime
                }) :
                firstChapterPrompt(title, siblingName, siblingType)
        }],
    });


    const client = await sql.connect();
    const newChapter = completion.choices[0]?.message?.content || "";

    await client.sql`
        INSERT INTO chapters (title, chapter_number, content, sibling)
        VALUES (${title}, ${chapterNumber}, ${newChapter}, ${siblingName})
    `;

    client.release();

    return NextResponse.json({
        content: newChapter
    });
}