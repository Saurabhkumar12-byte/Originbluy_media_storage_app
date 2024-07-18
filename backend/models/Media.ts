import mongoose, { Document, Schema } from 'mongoose';

export interface IMedia extends Document {
  user: mongoose.Schema.Types.ObjectId;
  url: string;
  type: 'image' | 'video';
}

const mediaSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], required: true }
  },
  {
    timestamps: true
  }
);

const Media = mongoose.model<IMedia>('Media', mediaSchema);

export default Media;
