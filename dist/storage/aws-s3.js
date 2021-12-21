"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3 = {
    saveFile: (file) => {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: 'nancologist-blog',
            Body: fs_1.default.createReadStream(file.path),
            Key: file.originalname
        });
        return client.send(command);
    }
};
const client = new client_s3_1.S3Client({
    region: 'eu-central-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
exports.default = s3;
