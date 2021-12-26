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
exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, pwd } = req.body;
    try {
        const hashedPwd = yield bcrypt_1.default.hash(pwd, 12);
        const dbRes = yield new user_1.default({ email, pwd: hashedPwd }).save();
        res.json({
            code: 'STORED',
            id: dbRes.insertedId
        });
    }
    catch (err) {
        console.error(err);
        res.json({
            err
        });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.getSingle(req.body.email);
        let failed = false;
        if (!user) {
            failed = true;
            console.error('No User with this email.');
        }
        else {
            const pwdOk = yield bcrypt_1.default.compare(req.body.pwd, user.pwd);
            if (!pwdOk) {
                failed = true;
                console.error('Wrong password');
            }
            else {
                const token = jsonwebtoken_1.default.sign({
                    email: user.email,
                    userId: user._id.toString()
                }, process.env.JWT_TOKEN, { expiresIn: '1h' });
                res.json({ token: token, userId: user._id.toString() });
                return;
            }
        }
        if (failed) {
            res.json({
                err: 'Wrong credentials.'
            });
        }
    }
    catch (err) {
        console.error(err);
    }
});
exports.signIn = signIn;
