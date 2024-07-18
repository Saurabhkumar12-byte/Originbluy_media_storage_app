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
exports.deleteMedia = exports.getUserMedia = exports.uploadMedia = void 0;
const Media_1 = __importDefault(require("../models/Media"));
const s3_1 = __importDefault(require("../utils/s3"));
const uuid_1 = require("uuid");
const uploadMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const user = req.user;
    if (!file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    const key = `${(0, uuid_1.v4)()}-${file.originalname}`;
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    s3_1.default.upload(params, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error uploading file' });
            return;
        }
        const media = new Media_1.default({
            user: user._id, // Explicitly cast _id to string
            url: data.Location,
            type: file.mimetype.startsWith('image') ? 'image' : 'video',
        });
        try {
            yield media.save();
            res.status(201).json(media);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error saving media' });
        }
    }));
});
exports.uploadMedia = uploadMedia;
const getUserMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const media = yield Media_1.default.find({ user: user._id }); // Explicitly cast _id to string
        res.status(200).json(media);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getUserMedia = getUserMedia;
const deleteMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    try {
        const media = yield Media_1.default.findById(id);
        if (!media) {
            res.status(404).json({ message: 'Media not found' });
            return;
        }
        if (media.user.toString() !== user._id.toString()) { // Explicitly cast _id to string
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: media.url.split('/').pop(),
        };
        s3_1.default.deleteObject(params, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error deleting file' });
                return;
            }
            try {
                yield media.deleteOne();
                res.status(200).json({ message: 'Media deleted' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error deleting media from database' });
            }
        }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteMedia = deleteMedia;
