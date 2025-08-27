import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  id: string;
  message: string;
  link?: string;
  color: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [200, 'Message cannot be more than 200 characters']
  },
  link: {
    type: String,
    trim: true,
    maxlength: [500, 'Link cannot be more than 500 characters']
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color'],
    default: '#3B82F6'
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Ensure only one notification can be active at a time
NotificationSchema.pre('save', async function(next) {
  if (this.isActive) {
    await mongoose.model('Notification').updateMany(
      { _id: { $ne: this._id } },
      { isActive: false }
    );
  }
  next();
});

export default mongoose.model<INotification>('Notification', NotificationSchema);