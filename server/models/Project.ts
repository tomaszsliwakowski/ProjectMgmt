import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  status: { type: String, enum: ["Not Started", "In Progress", "Completed"] },
  clientID: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

export const ProjectModel = mongoose.model("Project", ProjectSchema);