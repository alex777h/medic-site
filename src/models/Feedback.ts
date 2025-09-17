import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  name: string;
  text: string;
  date: Date;
  photoUrl?: string;
}

const FeedbackSchema = new Schema<IFeedback>({
  name: { type: String, required: true, maxlength: 40 },
  text: { type: String, required: true, maxlength: 600 },
  date: { type: Date, default: Date.now },
  photoUrl: { type: String },
});

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
