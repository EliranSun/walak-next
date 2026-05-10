import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const defaultDbName = process.env.MONGODB_DB ?? "logs";

if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
}

let clientPromise = null;

const connect = () => {
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 20000,
        connectTimeoutMS: 10000,
    });
    return client.connect().catch((error) => {
        clientPromise = null;
        throw error;
    });
};

export const getMongoClient = () => {
    if (!clientPromise) {
        clientPromise = connect();
    }
    return clientPromise;
};

export const getDb = async (dbName = defaultDbName) => {
    const client = await getMongoClient();
    return client.db(dbName);
};

export const resetMongoClient = async () => {
    const pending = clientPromise;
    clientPromise = null;
    if (!pending) return;
    try {
        const client = await pending;
        await client.close();
    } catch {
        // ignore — we're discarding this client anyway
    }
};

export const closeMongoClient = resetMongoClient;
