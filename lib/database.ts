// lib/connectToDB.ts
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let db: Db;

if (!uri) {
  throw new Error('Please define MONGODB_URI environment variable');
}

export async function connect(): Promise<Db> {
  if (db) return db;

  try {
    client = new MongoClient(uri, options);
    await client.connect();
    db = client.db(); // Add your database name if needed: client.db('your-db-name')
    console.log('MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}