// models/Vehicle.js
import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  licenseClass: {
    type: String,
    required: true,
  },
  additionalInformation: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  experience: {
    type: [String], // Array of strings
    required: true,
  },
  isAgree: {
    type: Boolean,
    required: true,
  },
});

export const Driver =
  mongoose.models.Driver || mongoose.model("Driver", driverSchema);
