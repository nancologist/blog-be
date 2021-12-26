"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./storage/db");
const middleware_1 = require("./middleware");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(middleware_1.allowCors);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to BLOG API!'
    });
    return;
});
app.use('/article', routes_1.default.article);
app.use('/auth', routes_1.default.auth);
const PORT = process.env.PORT;
(0, db_1.connectDb)(() => {
    app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
    });
});
