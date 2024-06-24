import {chat} from "@/utils/openAI";
import {getFoodNutritionPrompt} from "@/utils/prompts";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const food = searchParams.get("food");

        console.log({food});

        if (!food) {
            return NextResponse.json({
                error: "Missing required fields."
            });
        }

        const content = await chat(getFoodNutritionPrompt(food));
        console.log({content});
        return new NextResponse(JSON.stringify(content), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://trackers-seven.vercel.app/",
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            errorMessage: error.message,
            error: "Something went wrong. Please try again."
        });
    }
}