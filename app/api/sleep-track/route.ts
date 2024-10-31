import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { snakeCase } from "lodash";

export async function POST(request: NextRequest) {
	const supabase = createServerComponentClient({ cookies });
	const body = await request.json();

	const lines = body.data.split("\n");
	const sleepData = lines.map((line: string) => {
		const [key, value] = line.split(":");
		return { [snakeCase(key)]: value };
	});

	const { data, error } = await supabase
		.from("sleepTrack")
		.insert({
			sleep_start: sleepData.sleep_start,
			sleep_end: sleepData.sleep_end,
			duration: sleepData.sleep_duration,
			rem: sleepData.rem,
			deep: sleepData.deep,
			protein: sleepData.protein,
			carbs: sleepData.carbs,
			fat: sleepData.fat,
			sodium: sleepData.sodium,
			last_alcohol: sleepData.last_alcohol,
			last_food: sleepData.last_food,
			last_caffeine: sleepData.last_caffeine,
			last_exercise: sleepData.last_exercise,
			last_screen: sleepData.last_screen,
		})
		.select();

	if (error) {
		console.error(error);
		return NextResponse.json(
			{
				sleepData,
				error: error.message,
			},
			{ status: 500 }
		);
	}

	return NextResponse.json({ sleepData });
}
