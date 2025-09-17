import mongoose, { Schema, models, model } from 'mongoose';

const ContactSchema = new Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  hours: { type: String, required: true },
});

const Contact = models.Contact || model('Contact', ContactSchema);
export default Contact;
