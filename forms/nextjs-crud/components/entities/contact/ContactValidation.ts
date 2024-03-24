import * as yup from "yup";

const contactValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+[a-zA-Z\s]*$/, "Please enter only letters")
    .min(3, "First name should be minimum 3 characters")
    .max(20, "First name should be maximum 20 characters"),

  lastName: yup
    .string()
    .required("Last name is required field")
    .matches(/^[a-zA-Z]+[a-zA-Z\s]*$/, "Please enter only letters")
    .min(3, "Minimum length is 3 characters")
    .max(20, "Maximum length is 20 characters"),

  email: yup
    .string()
    .required("Email is required field")
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Please enter a valid email address"
    )
    .max(35, "Maximum length is 35 characters"),
  contactNo: yup
    .string()
    .required("Contact Number is required")
    .matches(
      /^03\d{9}$/,
      "Contact Number should be 03xxxxxxxxx and 11 digits only"
    ),

  account: yup
    .string()
    .required("Account is a required field")
    .matches(/^\S[\w\s]*$/, "Please enter a valid account number")
    .max(30, "Maximum length is 25 characters"),

  company: yup
    .string()
    .required("Company is a required field")
    .max(25, "Maximum length is 25 characters"),

  isAgree: yup.boolean().oneOf([true], "Please select the checkbox"),
  country: yup
    .string()
    .notOneOf(["0"], "Country is required field")
    .required("Country is required field"),
});

export default contactValidationSchema;
