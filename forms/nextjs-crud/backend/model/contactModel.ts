// models/contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
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
  contactNo: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  account: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  isAgree: {
    type: Boolean,
    required: true,
  },
});

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
