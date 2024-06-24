import {chat} from "@/utils/openAI";
import {getFoodNutritionPrompt} from "@/utils/prompts";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    try {
        const content = await chat(getFoodNutritionPrompt());
        return NextResponse.json({
            content,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Something went wrong. Please try again."
        });
    }
}