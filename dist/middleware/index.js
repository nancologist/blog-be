"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.allowCors = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const allowCors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};
exports.allowCors = allowCors;
const authenticateToken = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        console.error('Not Authenticated!');
        return;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    }
    catch (err) {
        console.error('Token can not be verified');
        res.json({
            code: 'TOKEN_NOT_VERIFIED',
            err: 'Token can not be verified'
        });
        return;
    }
    const invalidToken = !decodedToken;
    if (invalidToken) {
        console.error('Not Authenticated!');
        res.json({
            code: 'TOKEN_INVALID',
            err: 'Token is invalid'
        });
        return;
    }
    req.userId = decodedToken.userId;
    next();
};
exports.authenticateToken = authenticateToken;
