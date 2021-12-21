import { MongoClient, Db } from 'mongodb';

const { MONGODB_USER, MONGODB_PWD, MONGODB_DB } = process.env

let _db: Db;

const connString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PWD}@cluster0.4khrn.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`;

const client = new MongoClient(connString);

export const connectDb = async (callback: () => void) => {
  try {
    const dbClient = await client.connect()
    console.log('MongoDB client is connected.');
    _db = dbClient.db();
    callback()
  } catch (err) {
    console.error(err);
  }
};

export const getDb = () => {
  if (_db) {
      return _db;
  }
  throw 'No database found!'
};
