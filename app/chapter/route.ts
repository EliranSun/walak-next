import {NextRequest, NextResponse} from "next/server";
import OpenAI from "openai";

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
   const {
      title,
      chapterNumber,
      previousChapter,
      siblingType,
      siblingName,
      currentTime
   } = await request.json();

   if (!title || !chapterNumber || !previousChapter || !siblingType || !siblingName || !currentTime) {
      return NextResponse.json({error: "title, chapterNumber, previousChapter, siblingType, siblingName, and currentTime are required"})
   }

   let completion = await openai.chat.completions.create({
      messages: [{
         role: "system",
         content: nthChapterPrompt({
            title,
            chapterNumber,
            previousChapter,
            siblingType,
            siblingName,
            currentTime
         })
      }],
      // model: "gpt-3.5-turbo",
      // model: "gpt-4-1106-preview",
      model: "gpt-4",
   });

   const newChapter = completion.choices[0]?.message?.content || "";

   return NextResponse.json({
      content: newChapter
   });
}