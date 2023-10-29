import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
});

export const ClientModel = mongoose.model("Client", ClientSchema);
