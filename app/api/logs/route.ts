import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/utils/db";
import { ObjectId } from "mongodb";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const COLLECTION_NAME = "logs";

const DEFAULT_HEADERS: Record<string, string> = {
    "Cache-Control": "no-store, max-age=0",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
};

const buildResponder = (_request: NextRequest) =>
    (data: unknown, init?: ResponseInit) =>
        NextResponse.json(data, {
            ...init,
            status: init?.status ?? 200,
            headers: {
                ...DEFAULT_HEADERS,
                ...(init?.headers as Record<string, string> | undefined),
            },
        });

const buildQueryFromSearchParams = (searchParams: URLSearchParams) => {
    const query: Record<string, unknown> = {};

    if (searchParams.get("name")) {
        query.name = searchParams.get("name");
    }
    if (searchParams.get("category")) {
        query.category = searchParams.get("category");
    }
    if (searchParams.get("date")) {
        query.date = searchParams.get("date");
    }

    return query;
};

const getCollection = async () => {
    const db = await getDb();
    return db.collection(COLLECTION_NAME);
};

const parseObjectId = (id: string) => {
    try {
        return new ObjectId(id);
    } catch {
        return null;
    }
};

export async function GET(request: NextRequest) {
    const respond = buildResponder(request);
    try {
        const collection = await getCollection();
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (id) {
            const objectId = parseObjectId(id);
            if (!objectId) {
                return respond({ message: "Invalid id" }, { status: 400 });
            }

            const log = await collection.findOne({ _id: objectId });
            if (!log) {
                return respond({ message: "Log not found" }, { status: 404 });
            }
            return respond(log);
        }

        const query = buildQueryFromSearchParams(searchParams);
        const logs = await collection.find(query).sort({ date: -1 }).toArray();
        return respond(logs);
    } catch (error) {
        console.error("GET /api/logs failed:", error);
        return respond({ message: "Failed to fetch logs" }, { status: 500 });
    }
};

export async function POST(request: NextRequest) {
    const respond = buildResponder(request);
    try {
        const body = await request.json();
        if (!body?.name || !body?.date || !body?.category) {
            return respond(
                { message: "Name, date and category are required" },
                { status: 400 }
            );
        }

        const collection = await getCollection();
        const result = await collection.insertOne(body);

        return respond(
            { insertedId: result.insertedId, ...body },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /api/logs failed:", error);
        return respond({ message: "Failed to create log" }, { status: 500 });
    }
};

export async function PUT(request: NextRequest) {
    const respond = buildResponder(request);
    try {
        const body = await request.json();
        const { id, ...updates } = body || {};

        if (!id) {
            return respond({ message: "id is required" }, { status: 400 });
        }
        if (Object.keys(updates).length === 0) {
            return respond(
                { message: "At least one field to update is required" },
                { status: 400 }
            );
        }

        const objectId = parseObjectId(id);
        if (!objectId) {
            return respond({ message: "Invalid id" }, { status: 400 });
        }

        const collection = await getCollection();
        const { value } = await collection.findOneAndUpdate(
            { _id: objectId },
            { $set: updates },
            { returnDocument: "after" }
        );

        if (!value) {
            return respond({ message: "Log not found" }, { status: 404 });
        }

        return respond(value);
    } catch (error) {
        console.error("PUT /api/logs failed:", error);
        return respond({ message: "Failed to update log" }, { status: 500 });
    }
};

export async function DELETE(request: NextRequest) {
    const respond = buildResponder(request);
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return respond({ message: "id is required" }, { status: 400 });
        }

        const objectId = parseObjectId(id);
        if (!objectId) {
            return respond({ message: "Invalid id" }, { status: 400 });
        }

        const collection = await getCollection();
        const result = await collection.deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
            return respond({ message: "Log not found" }, { status: 404 });
        }

        return respond({ deletedId: id });
    } catch (error) {
        console.error("DELETE /api/logs failed:", error);
        return respond({ message: "Failed to delete log" }, { status: 500 });
    }
};

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}