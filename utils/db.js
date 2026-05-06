import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const defaultDbName = process.env.MONGODB_DB ?? "logs";

if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
}

let cachedClient = null;

export const getMongoClient = async () => {
    if (!cachedClient) {
        cachedClient = new MongoClient(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 20000,
            connectTimeoutMS: 5000,
        });
        try {
            await cachedClient.connect();
        } catch (error) {
            cachedClient = null;
            throw error;
        }
    }

    return cachedClient;
};

export const getDb = async (dbName = defaultDbName) => {
    const client = await getMongoClient();
    return client.db(dbName);
};

export const closeMongoClient = async () => {
    if (cachedClient) {
        await cachedClient.close();
        cachedClient = null;
    }
};
