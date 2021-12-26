"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = __importDefault(require("./article"));
const auth_1 = __importDefault(require("./auth"));
exports.default = {
    article: article_1.default,
    auth: auth_1.default
};
