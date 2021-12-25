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
exports.deleteAllArticles = exports.getArticle = exports.getArticles = exports.postArticle = void 0;
const fs_1 = __importDefault(require("fs"));
const aws_s3_1 = __importDefault(require("../storage/aws-s3"));
const article_1 = __importDefault(require("../models/article"));
const postArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleTitle, articleBody } = req.body;
    let imgFile;
    let imageName = undefined;
    let s3Res;
    try {
        if (req.file) {
            imgFile = req.file;
            imageName = Math.floor(Math.random() * 1000) + '_' + imgFile.originalname;
            imgFile.originalname = imageName;
            s3Res = yield aws_s3_1.default.saveFile(imgFile);
            fs_1.default.unlinkSync(imgFile.path);
        }
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
                s3: s3Res ? `Image uploaded with ETag: ${s3Res.ETag}` : 'NO_IMAGE'
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
exports.postArticle = postArticle;
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield article_1.default.getAll();
        res.json(articles);
    }
    catch (err) {
        console.error(err);
    }
});
exports.getArticles = getArticles;
const getArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield article_1.default.getSingle(req.params.articleId);
        res.json(article);
    }
    catch (err) {
        console.error(err);
    }
});
exports.getArticle = getArticle;
const deleteAllArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbRes = yield article_1.default.deleteAll();
        res.json({
            code: 'ALL_DELETED',
            msg: `Total number of ${dbRes.deletedCount} articles have been deleted.`
        });
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
exports.deleteAllArticles = deleteAllArticles;
