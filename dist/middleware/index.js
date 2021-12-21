"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CLIENT_URL = process.env.CLIENT_URL;
exports.allowCors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};
