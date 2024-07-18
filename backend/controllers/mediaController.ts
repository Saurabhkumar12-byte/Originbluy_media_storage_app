import { Response } from 'express';
import Media from '../models/Media';
import s3 from '../utils/s3';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../types/authRequest';
import { IUser } from '../models/User';

export const uploadMedia = async (req: AuthRequest, res: Response) => {
  const file = req.file;
  const user = req.user as IUser;

  if (!file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  const key = `${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  s3.upload(params, async (err:any, data:any) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error uploading file' });
      return;
    }

    const media = new Media({
      user: user._id as string, // Explicitly cast _id to string
      url: data.Location,
      type: file.mimetype.startsWith('image') ? 'image' : 'video',
    });

    try {
      await media.save();
      res.status(201).json(media);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving media' });
    }
  });
};

export const getUserMedia = async (req: AuthRequest, res: Response) => {
  const user = req.user as IUser;

  try {
    const media = await Media.find({ user: user._id as string }); // Explicitly cast _id to string
    res.status(200).json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMedia = async (req: AuthRequest, res: Response) => {
  const user = req.user as IUser;
  const { id } = req.params;

  try {
    const media = await Media.findById(id);

    if (!media) {
      res.status(404).json({ message: 'Media not found' });
      return;
    }

    if (media.user.toString() !== (user._id as string).toString()) { // Explicitly cast _id to string
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: media.url.split('/').pop()!,
    };

    s3.deleteObject(params, async (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting file' });
        return;
      }

      try {
        await media.deleteOne();
        res.status(200).json({ message: 'Media deleted' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting media from database' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
