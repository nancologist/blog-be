"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get('/test', (req, res) => {
    res.status(200).json({
        name: 'Helmut',
        age: 32,
        country: 'Senegal'
    });
});
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
