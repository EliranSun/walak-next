import "dotenv/config";
import logs from "../utils/logs-data.json" assert { type: "json" };
import { closeMongoClient, getDb } from "../utils/db.js";

const COLLECTION_NAME = "logs";

async function importLogs() {
    if (!Array.isArray(logs)) {
        throw new Error("logs-data.json is not an array.");
    }

    const db = await getDb();
    const collection = db.collection(COLLECTION_NAME);

    await collection.createIndex({ name: 1, date: 1 }, { unique: true });

    const operations = logs.map((entry) => ({
        updateOne: {
            filter: { name: entry.name, date: entry.date },
            update: { $set: entry },
            upsert: true,
        },
    }));

    const result = await collection.bulkWrite(operations, { ordered: false });

    console.log(
        `Logs import completed. Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`
    );
}

importLogs()
    .catch((error) => {
        console.error("Failed to import logs:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await closeMongoClient();
    });

