"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const mediaController_1 = require("../controllers/mediaController");
const multer_1 = __importDefault(require("../utils/multer"));
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, multer_1.default.single('file'), mediaController_1.uploadMedia);
router.get('/', authMiddleware_1.protect, mediaController_1.getUserMedia);
router.delete('/:id', authMiddleware_1.protect, mediaController_1.deleteMedia);
exports.default = router;
