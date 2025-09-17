import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  specialty: string;
  phone: string;
  email: string;
  description?: string;
}

const DoctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String },
});

export default models.Doctor || model<IDoctor>('Doctor', DoctorSchema);
