import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const database = client.db("PortfolioWebsite");

const clientEmails = database.collection("clientEmails");

export const clientContactInfo = async (info) => {
  await clientEmails.insertOne(info);
};
