import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/utils/db";

const COLLECTION_NAME = "logs";

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

export const GET = async (request: Request) => {
    try {
        const collection = await getCollection();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            const objectId = parseObjectId(id);
            if (!objectId) {
                return NextResponse.json({ message: "Invalid id" }, { status: 400 });
            }

            const log = await collection.findOne({ _id: objectId });
            if (!log) {
                return NextResponse.json({ message: "Log not found" }, { status: 404 });
            }
            return NextResponse.json(log);
        }

        const query = buildQueryFromSearchParams(searchParams);
        const logs = await collection.find(query).sort({ date: -1 }).toArray();
        return NextResponse.json(logs);
    } catch (error) {
        console.error("GET /api/logs failed:", error);
        return NextResponse.json({ message: "Failed to fetch logs" }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        if (!body?.name || !body?.date || !body?.category) {
            return NextResponse.json(
                { message: "Name, date and category are required" },
                { status: 400 }
            );
        }

        const collection = await getCollection();
        const result = await collection.insertOne(body);

        return NextResponse.json(
            { insertedId: result.insertedId, ...body },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /api/logs failed:", error);
        return NextResponse.json({ message: "Failed to create log" }, { status: 500 });
    }
};

export const PUT = async (request: Request) => {
    try {
        const body = await request.json();
        const { id, ...updates } = body || {};

        if (!id) {
            return NextResponse.json({ message: "id is required" }, { status: 400 });
        }
        if (Object.keys(updates).length === 0) {
            return NextResponse.json(
                { message: "At least one field to update is required" },
                { status: 400 }
            );
        }

        const objectId = parseObjectId(id);
        if (!objectId) {
            return NextResponse.json({ message: "Invalid id" }, { status: 400 });
        }

        const collection = await getCollection();
        const { value } = await collection.findOneAndUpdate(
            { _id: objectId },
            { $set: updates },
            { returnDocument: "after" }
        );

        if (!value) {
            return NextResponse.json({ message: "Log not found" }, { status: 404 });
        }

        return NextResponse.json(value);
    } catch (error) {
        console.error("PUT /api/logs failed:", error);
        return NextResponse.json({ message: "Failed to update log" }, { status: 500 });
    }
};

export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "id is required" }, { status: 400 });
        }

        const objectId = parseObjectId(id);
        if (!objectId) {
            return NextResponse.json({ message: "Invalid id" }, { status: 400 });
        }

        const collection = await getCollection();
        const result = await collection.deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Log not found" }, { status: 404 });
        }

        return NextResponse.json({ deletedId: id });
    } catch (error) {
        console.error("DELETE /api/logs failed:", error);
        return NextResponse.json({ message: "Failed to delete log" }, { status: 500 });
    }
};
