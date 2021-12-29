"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const db_1 = require("../storage/db");
const collName = 'articles';
class Article {
    constructor(props) {
        this._id = props._id ? new mongodb_1.ObjectId(props._id) : undefined;
        this.title = props.title;
        this.body = props.body;
        this.imageName = props.imageName || undefined;
        this.tags = props.tags;
        this.createdAt = Date.now();
    }
    save() {
        const collection = (0, db_1.getCollection)(collName);
        if (this._id) {
            return collection.updateOne({ _id: this._id }, { $set: this });
        }
        else {
            return collection.insertOne(this);
        }
    }
    static getAll() {
        return (0, db_1.getCollection)(collName).find().toArray();
    }
    static deleteAll() {
        return (0, db_1.getCollection)(collName).deleteMany({});
    }
    static getSingle(id) {
        return (0, db_1.getCollection)(collName).findOne(new mongodb_1.ObjectId(id));
    }
    static deleteSingle(id) {
        return (0, db_1.getCollection)(collName).findOneAndDelete({ _id: new mongodb_1.ObjectId(id) });
    }
}
exports.default = Article;
