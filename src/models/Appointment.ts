import * as mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

export interface IAppointment extends mongoose.Document {
  doctorId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  date: Date;
  comment?: string;
}

const AppointmentSchema = new Schema<IAppointment>({
  doctorId: { type: String, required: true },
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  patientEmail: { type: String, required: true },
  date: { type: Date, required: true },
  comment: { type: String },
});

export default models.Appointment || model<IAppointment>('Appointment', AppointmentSchema);
