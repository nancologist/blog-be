"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { getDb } = require('../storage/db');
const collectionName = 'articles';
class Article {
    constructor(props) {
        this.title = props.title;
        this.body = props.body;
        this.imageName = props.imageName;
        this.tags = props.tags;
    }
    save() {
        const db = getDb();
        return db.collection(collectionName).insertOne(this);
    }
}
exports.default = Article;
