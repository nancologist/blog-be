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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const aws_s3_1 = __importDefault(require("../storage/aws-s3"));
const article_1 = __importDefault(require("../models/article"));
exports.postArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleTitle, articleBody } = req.body;
    const imageName = req.file.originalname;
    try {
        const s3Res = yield aws_s3_1.default.saveFile(req.file);
        fs_1.default.unlinkSync(req.file.path);
        const article = new article_1.default({
            title: articleTitle,
            body: articleBody,
            imageName
        });
        const dbRes = yield article.save();
        res.json({
            code: 'POSTED',
            msg: {
                db: `Document inserted with _id: ${dbRes.insertedId}`,
                s3: `Image uploaded with ETag: ${s3Res.ETag}`
            }
        });
    }
    catch (err) {
        console.error(err);
        res.json({
            code: 'FAILED',
            err
        });
    }
});
exports.uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let httpCode = 0;
    try {
        const s3Res = yield aws_s3_1.default.saveFile(req.file);
        fs_1.default.unlinkSync(req.file.path);
        httpCode = +s3Res.$metadata.httpStatusCode;
        res.status(httpCode).json({
            msg: 'UPLOAD_DONE'
        });
    }
    catch (err) {
        console.error(err);
        res.json(err);
    }
});
