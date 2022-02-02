"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.catchError = exports.allowCors = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const allowCors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};
exports.allowCors = allowCors;
const catchError = (err, req, res, next) => {
    if (req.url === '/auth/check-token') {
        return;
    }
    if (req.url.split('/')[1] === 'auth') {
        res.status(401).json(err);
        return;
    }
    res.status(500).json(err);
    return;
};
exports.catchError = catchError;
const validateToken = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        console.error('Not Authenticated!');
        res.json({
            code: 'HEADER_NOT_FOUND',
            err: 'Auth Not Found In Header!'
        });
        return;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    }
    catch (err) {
        throw 'Token can not be verified.';
    }
    const invalidToken = !decodedToken;
    if (invalidToken) {
        res.json({
            code: 'TOKEN_INVALID',
            err: 'Token is invalid'
        });
        return;
    }
    req.userId = decodedToken.userId;
    next();
};
exports.validateToken = validateToken;
