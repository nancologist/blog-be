"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowCors = void 0;
const CLIENT_URL = process.env.CLIENT_URL;
const allowCors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};
exports.allowCors = allowCors;
