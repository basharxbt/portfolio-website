import { MongoClient } from "mongodb";

// Reuses one connection (important for Next.js hot reload and Vercel serverless).
let clientPromise = globalThis._mongoClientPromise;

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri)
    throw new Error("MONGODB_URI is not set in your environment variables");

  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
    globalThis._mongoClientPromise = clientPromise;
  }
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "portfolio");
}
