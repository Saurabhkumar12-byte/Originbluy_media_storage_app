import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { uploadMedia, getUserMedia, deleteMedia } from '../controllers/mediaController';
import upload from '../utils/multer';

const router = express.Router();

router.post('/', protect, upload.single('file'), uploadMedia);
router.get('/', protect, getUserMedia);
router.delete('/:id', protect, deleteMedia);

export default router;
