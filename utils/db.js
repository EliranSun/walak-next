import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const defaultDbName = process.env.MONGODB_DB ?? "logs";

if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
}

let cachedClient = null;

export const getMongoClient = async () => {
    if (!cachedClient) {
        cachedClient = new MongoClient(uri);
        await cachedClient.connect();
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
