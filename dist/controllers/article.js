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
exports.deleteArticle = exports.getArticle = exports.getArticles = exports.updateArticle = exports.postArticle = void 0;
const fs_1 = __importDefault(require("fs"));
const aws_s3_1 = __importDefault(require("../storage/aws-s3"));
const article_1 = __importDefault(require("../models/article"));
const postArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleCategory, articleTitle, articleBody } = req.body;
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
            category: articleCategory,
            title: articleTitle,
            body: articleBody,
            imageName
        });
        const dbRes = yield article.save();
        res.json({
            code: 'POSTED',
            id: dbRes.insertedId,
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
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { article: articleProps } = req.body;
    let dbRes = {};
    try {
        const updatingArticle = new article_1.default(articleProps);
        dbRes = yield updatingArticle.save();
    }
    catch (err) {
        console.error(err);
    }
    res.json({
        code: 'UPDATED',
        dbRes
    });
    return;
});
exports.updateArticle = updateArticle;
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield article_1.default.getAll();
        res.json(articles.reverse());
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
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resCode = [];
        const dbRes = yield article_1.default.deleteSingle(req.params.articleId);
        if (dbRes.ok === 1) {
            resCode = ['ARTICLE_DELETED'];
            const deletedArticle = dbRes.value;
            if (deletedArticle.imageName) {
                const s3Res = yield aws_s3_1.default.deleteFile(deletedArticle.imageName);
                if (s3Res.$metadata.httpStatusCode === 204) {
                    resCode.push('FILE_DELETED');
                }
            }
        }
        res.json({
            code: resCode,
        });
        return;
    }
    catch (err) {
        console.error(err);
    }
});
exports.deleteArticle = deleteArticle;
