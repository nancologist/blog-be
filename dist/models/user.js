"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../storage/db");
const collName = 'users';
class User {
    constructor(props) {
        this.email = props.email;
        this.pwd = props.pwd;
    }
    save() {
        return (0, db_1.getCollection)(collName).insertOne(this);
    }
}
exports.default = User;
