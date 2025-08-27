import mongoose, { Document, Schema } from 'mongoose';

export interface IFeature extends Document {
  title: string;
  desc: string;
  iconKey: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeatureSchema: Schema = new Schema({

  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  desc: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  iconKey: {
    type: String,
    required: [true, 'Icon key is required'],
    trim: true
  },
  color: {
    type: String,
    default: '#3B82F6',
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
  }
}, {
  timestamps: true
});

export default mongoose.model<IFeature>('Feature', FeatureSchema);