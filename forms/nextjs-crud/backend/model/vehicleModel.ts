// models/Vehicle.js
import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  vehicleIdentificationNumber: {
    type: String,
    required: true,
  },
  vehicleBodyType: {
    type: String,
    required: true,
  },
  engineNumber: {
    type: String,
    required: true,
  },
  manufacturedYear: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  odometerReading: {
    type: Number,
    required: true,
  },
  regExpiry: {
    type: Date,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  textArea: {
    type: String,
    required: false,
  },
  radioButtonsGroup: {
    type: String,
    required: true,
  },
  wheeler: {
    type: [String], // Array of strings
    required: true,
  },
  isAgree: {
    type: Boolean,
    required: true,
  },
});

export const Vehicle =
  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
