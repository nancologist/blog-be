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
    static getSingle(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, db_1.getCollection)(collName).findOne({ email: email });
        });
    }
}
exports.default = User;
