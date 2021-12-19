const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_USER = 'moridbblog'
const MONGODB_PWD = 'J7AdrV59fVReE8M'
const MONGODB_DB = 'blog_db'

let _db;

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PWD}@cluster0.4khrn.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDb = callback => {
  client.connect()
    .then(dbClient => {
      console.log('MongoDB client is connected.');
      _db = dbClient.db();
      
      callback()
    })
    .catch(err => {
      console.error(err);
    })
};

const getDb = () => {
  if (_db) {
      return _db;
  }
  throw 'No database found!'
};

module.exports = {
  connectDb,
  getDb
}