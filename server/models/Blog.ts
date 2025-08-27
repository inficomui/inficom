import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  category: string;
  author: string;
  date: string;
  comments: number;
  rating: number;
  desc: string;
  href: string;
  image: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    maxlength: [50, 'Category cannot be more than 50 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author cannot be more than 100 characters']
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
    trim: true
  },
  comments: {
    type: Number,
    default: 0,
    min: [0, 'Comments cannot be negative']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  desc: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  href: {
    type: String,
    required: [true, 'URL is required'],
    trim: true,
    maxlength: [200, 'URL cannot be more than 200 characters']
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true
  },
  content: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IBlog>('Blog', BlogSchema);