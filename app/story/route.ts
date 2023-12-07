import {NextRequest, NextResponse} from 'next/server';
import OpenAI from "openai";
import {sql} from "@vercel/postgres";
import {DateTimeFormatOptions} from "next-intl";

const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({
    key: "AIzaSyA455yJXOa8oAcpnXQZkR_F4rxEye-1sZY"
});

const openai = new OpenAI({
    apiKey: "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",
});

const HEBREW_TARGET_LANGUAGE = 'he';
const KOREAN_TARGET_LANGUAGE = 'ko';
const JAPANESE_TARGET_LANGUAGE = 'ja';

function getJerusalemTime() {
    const options = {
        timeZone: 'Asia/Jerusalem',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    } as DateTimeFormatOptions;

    return new Intl.DateTimeFormat('en-GB', options).format(new Date());
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const feeling = searchParams.get("feeling");
    const genre = searchParams.get("genre");
    const siblingName = searchParams.get("sibling_name");
    const siblingType = searchParams.get("sibling_type");

    if (!feeling || !genre || !siblingName || !siblingType) {
        return NextResponse.json({error: "feelings, genre, sibling_name, and sibling_type are required"})
    }

    const storyTitlePrompt = `
   You are a professional storyteller. 
   Create a story title that will encapsulate the feeling of being ${feeling} and that will fit a story with the genre of ${genre}.
   The story will include me, Eliran, and my ${siblingType} ${siblingName}.
   Use light language/terminology.
   Output nothing but the story title!`;

    const firstChapterPrompt = (title: string) => `
   You are a professional storyteller.
   Create a short first chapter for a story with a title of "${title}".
   This is chapter 1 out of 7.
   The story will include me, Eliran, and my ${siblingType} ${siblingName}.
   Limit the chapter to around 500 characters.
   Use simple language/terminology!
   Output nothing but the story chapter!`;

    const currentTime = getJerusalemTime();

    console.log({currentTime});

    const nthChapterPrompt = (title: string, chapterNumber: number, previousChapter: string) => `
   You are a professional storyteller.
   Create a chapter for a story with a title of "${title}", and based of the previous chapter below.
   This is chapter number ${chapterNumber} out of 7.
   This chapter should include me, Eliran, and my ${siblingType} ${siblingName}.
   In addition include the current time - ${currentTime} - somehow in the chapter.
   Limit the chapter to around 500 characters.
   Use simple language/terminology!
   Output nothing but the story chapter!
   
   Previous chapter:
   ${previousChapter}`;

    const client = await sql.connect();

    try {
        console.info("Init title query");
        const {rows} = await client.sql`
          SELECT * from titles WHERE sibling = ${siblingName}
      `;

        let title;
        let chapterContent;
        let chapterNumber;

        const translations = {
            [HEBREW_TARGET_LANGUAGE]: "",
            [KOREAN_TARGET_LANGUAGE]: "",
            [JAPANESE_TARGET_LANGUAGE]: "",
        };
        const chapterTranslations = {
            [HEBREW_TARGET_LANGUAGE]: "",
            [KOREAN_TARGET_LANGUAGE]: "",
            [JAPANESE_TARGET_LANGUAGE]: "",
        };

        if (rows.length === 0) {
            console.info("no rows, creating new title");
            let completion = await openai.chat.completions.create({
                messages: [{role: "system", content: storyTitlePrompt}],
                // model: "gpt-3.5-turbo",
                model: "gpt-4-1106-preview",
            });

            title = completion.choices[0]?.message?.content || "";

            console.info("title", title);

            completion = await openai.chat.completions.create({
                messages: [{role: "system", content: firstChapterPrompt(title)}],
                // model: "gpt-3.5-turbo",
                model: "gpt-4-1106-preview",
            });
            chapterContent = completion.choices[0]?.message?.content || "";
            console.info("chapterContent", chapterContent);

            let [[titleTranslation], [chapterTranslation]] = await Promise.all([
                translate.translate(title, HEBREW_TARGET_LANGUAGE),
                translate.translate(chapterContent, HEBREW_TARGET_LANGUAGE)
            ]);

            titleTranslation = Array.isArray(titleTranslation) ? titleTranslation : [titleTranslation];
            titleTranslation.forEach((t: string) => {
                translations[HEBREW_TARGET_LANGUAGE] += `${t}\n`;
            });

            chapterTranslation = Array.isArray(chapterTranslation) ? chapterTranslation : [chapterTranslation];
            chapterTranslation.forEach((t: string) => {
                chapterTranslations[HEBREW_TARGET_LANGUAGE] += `${t}\n`;
            });

            chapterNumber = 1;
            Promise.all([
                client.sql`
                INSERT INTO titles (title, hebrew_translation, sibling, active_chapter_number)
                VALUES (${title}, ${translations[HEBREW_TARGET_LANGUAGE]}, ${siblingName}, ${chapterNumber})
            `,
                client.sql`
                INSERT INTO chapters (chapter_number, title, sibling, content, hebrew_translation)
                VALUES (${chapterNumber}, ${title}, ${siblingName}, ${chapterContent}, ${chapterTranslations[HEBREW_TARGET_LANGUAGE]})
            `
            ]);
        } else {
            console.info("found existing title");
            title = rows[0].title;
            const activeChapterNumber = rows[0].active_chapter_number || 1;

            const {rows: chapterRows} = await client.sql`
            SELECT * from chapters
            WHERE sibling = ${siblingName} AND chapter_number = ${activeChapterNumber} AND title = ${title}`;

            const previousChapter = chapterRows[0].content;
            chapterNumber = activeChapterNumber + 1;

            console.info("generating the new chapter", chapterNumber);

            let completion = await openai.chat.completions.create({
                messages: [{role: "system", content: nthChapterPrompt(title, chapterNumber, previousChapter)}],
                // model: "gpt-3.5-turbo",
                // model: "gpt-4-1106-preview",
                model: "gpt-4",
            });

            const newChapter = completion.choices[0]?.message?.content || "";

            console.info("newChapter", newChapter);
            const [newTranslation] = await translate.translate(newChapter, HEBREW_TARGET_LANGUAGE);

            client.sql`
             INSERT INTO chapters (chapter_number, title, sibling, content, hebrew_translation)
             VALUES (${chapterNumber}, ${title}, ${siblingName}, ${newChapter}, ${newTranslation})
         `
            client.sql`
             UPDATE titles SET active_chapter_number = ${chapterNumber} WHERE title = ${title}
         `

            translations[HEBREW_TARGET_LANGUAGE] = newTranslation;
            chapterContent = newChapter;
        }

        console.timeEnd("GET");

        return NextResponse.json({
            title,
            translations,
            chapterNumber,
            content: chapterContent
        });
    } catch (error: any) {
        console.log(error.message);
        console.trace();

        return NextResponse.json({
            error: "Something went wrong. Please try again. Is that OK?"
        });
    } finally {
        client.release();
    }
}