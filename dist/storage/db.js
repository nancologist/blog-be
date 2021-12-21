"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectDb = void 0;
const mongodb_1 = require("mongodb");
const { MONGODB_USER, MONGODB_PWD, MONGODB_DB } = process.env;
let _db;
const connString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PWD}@cluster0.4khrn.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(connString);
const connectDb = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbClient = yield client.connect();
        console.log('MongoDB client is connected.');
        _db = dbClient.db();
        callback();
    }
    catch (err) {
        console.error(err);
    }
});
exports.connectDb = connectDb;
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};
exports.getDb = getDb;
