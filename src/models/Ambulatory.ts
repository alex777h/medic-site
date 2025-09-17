import mongoose, { Schema } from "mongoose";


const AmbulatorySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  text: { type: String },
});

export default mongoose.models.Ambulatory || mongoose.model("Ambulatory", AmbulatorySchema);
