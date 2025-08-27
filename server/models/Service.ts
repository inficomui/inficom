import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {

  title: string;
  iconKey: string;
  description: string;
  details?: string;
  extraDescription?: string[];
  features: string[];
  included?: string[];
  notIncluded?: string[];
  terms?: string[];
  faqs?: { q: string; a: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
 
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  iconKey: {
    type: String,
    required: [true, 'Icon key is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  details: {
    type: String,
    trim: true,
    maxlength: [1000, 'Details cannot be more than 1000 characters']
  },
  extraDescription: [{
    type: String,
    trim: true,
    maxlength: [500, 'Extra description item cannot be more than 500 characters']
  }],
  features: [{
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Feature cannot be more than 100 characters']
  }],
  included: [{
    type: String,
    trim: true,
    maxlength: [100, 'Included item cannot be more than 100 characters']
  }],
  notIncluded: [{
    type: String,
    trim: true,
    maxlength: [100, 'Not included item cannot be more than 100 characters']
  }],
  terms: [{
    type: String,
    trim: true,
    maxlength: [200, 'Term cannot be more than 200 characters']
  }],
  faqs: [{
    q: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Question cannot be more than 200 characters']
    },
    a: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Answer cannot be more than 500 characters']
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model<IService>('Service', ServiceSchema);