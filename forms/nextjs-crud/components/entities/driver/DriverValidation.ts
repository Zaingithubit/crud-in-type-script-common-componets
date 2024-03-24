import * as Yup from "yup";
import dayjs from "dayjs";

const driverValidaitonSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .max(20, "First Name must be at most 20 characters")
    .min(3, "First Name must be at least 3 characters")
    .matches(
      /^[A-Za-z][A-Za-z\s]+$/i,
      "Please enter a valid first name (letters only)"
    ),
  lastName: Yup.string()
    .required("Last Name is required")
    .max(20, "Last Name must be at most 20 characters")
    .min(3, "Last Name must be at least 3 characters")
    .matches(
      /^[A-Za-z][A-Za-z\s]+$/i,
      "Please enter a valid last name (letters only)"
    ),
  dob: Yup.string()
    .required("Date of Birth is required")
    .test(
      "date-of-birthday",
      "You must be 18 years old or older",
      function (value) {
        if (!value) return true; // If no date selected, it's valid
        const currentDate = dayjs();
        const selectedDate = dayjs(value, "YYYY-MM-DD");
        const age = currentDate.diff(selectedDate, "year");
        return age >= 18;
      }
    ),
  bloodGroup: Yup.string()
    .required("Blood Group is required")
    .notOneOf(["0"], "Blood Group is required"),
  email: Yup.string()
    .required("Email is required")
    .max(30, "Email should be less than 30 characters")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email address"
    ),
  contactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(
      /^03\d{9}$/,
      "Contact Number should be 03xxxxxxxxx and 11 digits only"
    ),
  address: Yup.string()
    .required("Address is required")
    .max(200, "Address should be less than 200 characters"),
  licenseNumber: Yup.string()
    .required("License Number is required")
    .max(10, "License Number should be maximum 10 characters")
    .matches(/^[A-Za-z0-9]+$/i, "License number should be alphanumeric"),
  licenseClass: Yup.string()
    .required("License Class is required")
    .notOneOf(["0"], "License Class is required"),
  expiryDate: Yup.string()
    .required("Expiry Date is required")
    .test("future-date", "Expiry date only future date", function (value) {
      if (!value) return true; // If no date selected, it's valid
      const selectedDate = dayjs(value);
      const currentDate = dayjs().startOf("day"); // Start of the current day
      return selectedDate.isAfter(currentDate); // Check if the selected date is strictly in the future
    }),
  experience: Yup.array().min(1, "Checked at least one Vehicle"),
  isAgree: Yup.boolean().oneOf(
    [true],
    "Please confirm that all information is correct"
  ),
});
export default driverValidaitonSchema;
