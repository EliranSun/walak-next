import {chat} from "@/utils/openAI";
import {getFoodNutritionPrompt} from "@/utils/prompts";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const food = searchParams.get("food");

        if (!food) {
            return NextResponse.json({
                error: "Missing required fields."
            });
        }
        
        const content = await chat(getFoodNutritionPrompt(food));
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