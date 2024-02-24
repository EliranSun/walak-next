import {NextRequest, NextResponse} from "next/server";
import {getFirstChapterPrompt, getNewChapterPrompt} from "@/utils/prompts";
import {chat} from "@/utils/openAI";
import {getTranslation} from "@/utils/translate";
import {db} from "@vercel/postgres";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
   try {
      const {
         siblingName,
         genre,
         theme,
         previousChapters,
         readerChoice,
      } = await request.json();

      console.log({
         siblingName,
         genre,
         theme,
         previousChapters,
         readerChoice,
      });

      if (!siblingName || !genre || !theme) {
         return NextResponse.json({
            error: "Missing required fields."
         });
      }

      const isNewChapter = readerChoice && previousChapters;
      const promptParams = {
         siblingName,
         genre,
         theme,
         previousChapters,
         readerChoice,
      };
      const prompt = isNewChapter ? getNewChapterPrompt(promptParams) : getFirstChapterPrompt(promptParams);
      const content = await chat(prompt);
      const translation = await getTranslation(content);

      return NextResponse.json({
         content,
         translation
      });
   } catch (error) {
      console.error(error);
      return NextResponse.json({
         error: "Something went wrong. Please try again."
      });
   }
}

type Chapter = {
   translation: string;
   content: string;
};

export async function PUT(request: NextRequest) {
   try {
      const client = await db.connect();
      const requestJSON = await request.json();
      const {
         personName,
         title,
         genre,
         theme,
         chapters,
      }: {
         personName: string;
         title: string;
         genre: string;
         theme: string;
         chapters: Chapter[];
         chapterNumber?: number;
      } = requestJSON;

      let {chapterNumber = 1} = requestJSON;

      if (chapters.length === 0 || !personName || !title || !genre || !theme) {
         return NextResponse.json({error: "Missing required fields."});
      }

      for (const chapter of chapters) {
         const {translation, content} = chapter;
         console.log({
            personName,
            title,
            genre,
            theme,
            translation,
            content
         });

         await client.sql`INSERT INTO chapters (chapter_number, sibling, title, content, translation, genre, theme) VALUES (${chapterNumber}, ${personName}, ${title}, ${content}, ${translation}, ${genre}, ${theme});`;

         chapterNumber++;
      }

      return NextResponse.json({success: true});
   } catch (error: any) {
      console.error(error);
      return NextResponse.json({error: "Something went wrong. Please try again. Is that OK?"});
   }
}

// TODO: Refactor - patch is not the right method for this
export async function PATCH(request: NextRequest) {
   try {
      const client = await db.connect();
      const requestJson = await request.json();
      const {chapterId} = requestJson;

      if (!chapterId) {
         return NextResponse.json({error: "Missing required fields."});
      }

      await client.sql`DELETE FROM chapters WHERE id = ${chapterId};`;

      return NextResponse.json({success: true});
   } catch (error: any) {
      console.error(error);
      console.trace();
      return NextResponse.json({error: "Something went wrong. Please try again. Is that OK?"});
   }
}