"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../storage/db");
const collName = 'articles';
class Article {
    constructor(props) {
        this.title = props.title;
        this.body = props.body;
        this.imageName = props.imageName || undefined;
        this.tags = props.tags;
    }
    save() {
        const db = (0, db_1.getDb)();
        return db.collection(collName).insertOne(this);
    }
    static getAll() {
        const db = (0, db_1.getDb)();
        return db.collection(collName).find().toArray();
    }
}
exports.default = Article;
