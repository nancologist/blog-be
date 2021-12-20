"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const { allowCors } = require('./middleware');
const articleRoutes = require('./routes/article');
const { connectDb } = require('./storage/mongodb');
app.use(allowCors);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to BLOG API!'
    });
});
app.use('/article', articleRoutes);
const PORT = process.env.PORT;
connectDb(() => {
    app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
    });
});
