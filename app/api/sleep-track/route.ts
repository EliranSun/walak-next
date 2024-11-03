import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { snakeCase } from "lodash";

export async function POST(request: NextRequest) {
	const supabase = createServerComponentClient({ cookies });
	const body = await request.json();

	const lines = body.data.split("\n");
	const sleepData = lines.reduce((acc: any, line: string) => {
		const [key, value] = line.split(":");
		acc[snakeCase(key)] = value.trim();
		return acc;
	}, {});

	const { data, error } = await supabase
		.from("sleepTrack")
		.insert([
			{
				duration: sleepData.sleep_duration,
				sleep_start: sleepData.sleep_start,
				sleep_end: sleepData.sleep_end,
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
			},
		])
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

	return NextResponse.json({ data, sleepData });
}

export async function GET(request: NextRequest) {
	const supabase = createServerComponentClient({ cookies });
	const date = request.nextUrl.searchParams.get("date");
	const dateKey = {
		day: Number(date?.split("-")[2]),
		month: Number(date?.split("-")[1]),
		year: Number(date?.split("-")[0]),
	};

	if (!dateKey.day || !dateKey.month || !dateKey.year) {
		return NextResponse.json({ error: "Invalid date" }, { status: 400 });
	}

	const dateOneWeekAgo = new Date(
		new Date(dateKey.year, dateKey.month, dateKey.day).getTime() -
			7 * 24 * 60 * 60 * 1000
	);

	const dateOneWeekAgoKey = {
		day: dateOneWeekAgo?.toISOString().split("-")[2],
		month: dateOneWeekAgo?.toISOString().split("-")[1],
		year: dateOneWeekAgo?.toISOString().split("-")[0],
	};

	const gteKey = `${dateOneWeekAgoKey.year}-${dateOneWeekAgoKey.month}-${dateOneWeekAgoKey.day}T00:00:00Z`;
	const ltKey = `${dateKey.year}-${dateKey.month}-${dateKey.day}T23:59:59Z`;

	const { data, error } = await supabase
		.from("sleepTrack")
		.select()
		.gte("created_at", gteKey)
		.lt("created_at", ltKey);

	return NextResponse.json(
		{ data, gteKey, ltKey, error },
		{
			headers: {
				"Cache-Control": "no-store, max-age=0",
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			},
		}
	);
}
