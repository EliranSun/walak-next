import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { snakeCase } from "lodash";

export async function POST(request: NextRequest) {
	const supabase = createServerComponentClient({ cookies });
	const body = await request.json();

	const lines = body.data.split("\n");
	const sleepData = lines.reduce((acc: any, line: string) => {
		const [key, value] = line.split("::");
		acc[snakeCase(key)] = value.trim();
		return acc;
	}, {});

	// Get today's date in the format YYYY-MM-DD
	const today = new Date().toISOString().split("T")[0];

	const { data, error } = await supabase
		.from("sleepTrack")
		.insert([
			{
				date: today,
				duration: sleepData.sleep_duration || "-",
				sleep_start: sleepData.sleep_start || "-",
				sleep_end: sleepData.sleep_end || "-",
				rem: sleepData.rem || "-",
				deep: sleepData.deep || "-",
				protein: sleepData.protein || "-",
				carbs: sleepData.carbs || "-",
				fat: sleepData.fat || "-",
				sodium: sleepData.sodium || "-",
				last_alcohol: sleepData.last_alcohol || "-",
				last_food: sleepData.last_food || "-",
				last_caffeine: sleepData.last_caffeine || "-",
				last_exercise: sleepData.last_exercise || "-",
				last_screen: sleepData.last_screen || "-",
				wrist_temperature: sleepData.wrist_temperature || null,
				feeling: sleepData.feeling || "-",
				tags: sleepData.tags || [],
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

	// Helper function to pad numbers to 2 digits
	const padToTwoDigits = (num: number) => num.toString().padStart(2, "0");

	const dateKey = {
		day: padToTwoDigits(Number(date?.split("-")[2])),
		month: padToTwoDigits(Number(date?.split("-")[1])),
		year: date?.split("-")[0],
	};

	if (!dateKey.day || !dateKey.month || !dateKey.year) {
		return NextResponse.json({ error: "Invalid date" }, { status: 400 });
	}

	const dateOneWeekAgo = new Date(
		new Date(
			Number(dateKey.year),
			Number(dateKey.month) - 1,
			Number(dateKey.day)
		).getTime() -
			7 * 24 * 60 * 60 * 1000
	);

	const dateOneWeekAgoKey = {
		day: padToTwoDigits(Number(dateOneWeekAgo.getDate())),
		month: padToTwoDigits(Number(dateOneWeekAgo.getMonth() + 1)),
		year: dateOneWeekAgo.getFullYear().toString(),
	};

	const gteKey = `${dateOneWeekAgoKey.year}-${dateOneWeekAgoKey.month}-${dateOneWeekAgoKey.day}T00:00:00Z`;
	const ltKey = `${dateKey.year}-${dateKey.month}-${dateKey.day}T23:59:59Z`;

	const { data, error } = await supabase
		.from("sleepTrack")
		.select()
		.gte("created_at", gteKey)
		.lt("created_at", ltKey)
		.order("created_at", { ascending: false });

	if (error) {
		return NextResponse.json({ error }, { status: 500 });
	}

	// Group entries by date and keep only the latest entry per day
	const lastEntriesPerDay = data?.reduce((acc: any[], entry) => {
		const date = entry.created_at.split("T")[0]; // Get just the date part
		const existingEntry = acc.find(
			(item) => item.created_at.split("T")[0] === date
		);

		if (!existingEntry) {
			acc.push(entry);
		}

		return acc;
	}, []);

	return NextResponse.json(
		{ data: lastEntriesPerDay, error },
		{
			headers: {
				"Cache-Control": "no-store, max-age=0",
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			},
		}
	);
}
