import {NextResponse} from "next/server";
import OpenAI from "openai";
import {sql} from "@vercel/postgres";
import {firstChapterPrompt, nthChapterPrompt} from "@/utils/prompts";

const openai = new OpenAI({
   apiKey: "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",
});

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
      feeling,
      chosenOption
   } = requestJSON;

   if (!siblingName || !currentTime) {
      return NextResponse.json({error: "chapterNumber, siblingName, and currentTime are required"})
   }

   const {rows: existingChapters} = await sql`
        SELECT * FROM chapters WHERE title = ${title} AND sibling = ${siblingName}
    `;

   const lastChapter = existingChapters.at(-1);
   const existingTitle = lastChapter?.title;
   const previousChapter = lastChapter?.content;
   const existingFeeling = lastChapter?.feeling;
   const existingGenre = lastChapter?.genre;
   const currentChapterNumber = lastChapter?.chapter_number;
   const nextChapterNumber = currentChapterNumber ? currentChapterNumber + 1 : 1;

   let theStoryThusFar = "";
   existingChapters.forEach((chapter) => {
      theStoryThusFar += chapter.content;
   });

   if (nextChapterNumber > 7) {
      return NextResponse.json({error: "Final chapter number reached, call /reset to generate a new story"});
   }

   if (!lastChapter && (!genre || !feeling)) {
      return NextResponse.json({error: "genre and feeling are required for first time chapter generation"});
   }

   const siblingType = ["or", "yahel"].includes(siblingName.toLowerCase()) ? "brother" : "sister";
   let completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
         role: "system",
         content: lastChapter ?
            nthChapterPrompt({
               siblingType,
               siblingName,
               currentTime,
               chapterNumber: nextChapterNumber,
               title: existingTitle || title,
               theStoryThusFar,
               feeling: existingFeeling || feeling,
               genre: existingGenre || genre,
               chosenOption
            }) :
            firstChapterPrompt({
               title,
               siblingName,
               siblingType,
               feeling,
               genre,
               currentTime
            })
      }],
   });

   const client = await sql.connect();
   const newChapter = completion.choices[0]?.message?.content || "";

   await client.sql`
        INSERT INTO chapters (title, chapter_number, content, sibling, emotion, genre)
        VALUES (${title}, ${nextChapterNumber}, ${newChapter}, ${siblingName}, ${feeling}, ${genre})
    `;

   client.release();

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
