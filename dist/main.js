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
app
    .use(middleware_1.allowCors)
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: true }))
    .get('/', (req, res) => {
    res.json({
        message: 'Welcome to BLOG API!'
    });
    return;
})
    .use('/article', routes_1.default.article)
    .use('/auth', routes_1.default.auth)
    .use(middleware_1.catchError);
const PORT = process.env.PORT;
(0, db_1.connectDb)(() => {
    app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
    });
});
