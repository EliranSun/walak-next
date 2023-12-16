import {NextRequest, NextResponse} from "next/server";
import {getFirstChapterPrompt, getNewChapterPrompt} from "@/app/story/chapter/prompts";
import {chat} from "@/utils/openAI";
import {getTranslation} from "@/utils/translate";

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
