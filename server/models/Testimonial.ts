import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {

  name: string;
  role: string;
  text: string;
  image: string;
  stars: number;
  size: 'small' | 'large';
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema({

  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot be more than 100 characters']
  },
  text: {
    type: String,
    required: [true, 'Testimonial text is required'],
    trim: true,
    maxlength: [1000, 'Text cannot be more than 1000 characters']
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true
  },
  stars: {
    type: Number,
    required: [true, 'Stars rating is required'],
    min: [1, 'Stars must be at least 1'],
    max: [5, 'Stars cannot be more than 5']
  },
  size: {
    type: String,
    enum: ['small', 'large'],
    default: 'small'
  }
}, {
  timestamps: true
});

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);