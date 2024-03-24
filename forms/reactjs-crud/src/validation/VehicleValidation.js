import * as yup from "yup";
const validationSchema = yup.object().shape({
  make: yup
    .string()
    .required("Make is required")
    .matches(/^[a-zA-Z]+$/, {
      message: "Make should contain only alphabets",
      excludeEmptyString: true,
    })
    .min(3, "Make should be at least 3 characters")
    .max(20, "Make should not exceed 20 characters"),
  model: yup
    .string()
    .required("Model is required")
    .matches(/^[a-zA-Z0-9]+$/, {
      message: "Model should contain alphabets & numbers",
      excludeEmptyString: true,
    })
    .min(3, "Model should be at least 3 characters")
    .max(30, "Model should not exceed 30 characters"),
  vehicleIdentificationNumber: yup
    .string()
    .required("Vehicle identification number is required")
    .matches(/^[a-zA-Z0-9]+$/, {
      message:
        "Vehicle identification number should contain alphabets & numbers",
      excludeEmptyString: true,
    })
    .min(3, "Vehicle identification number should be at least 3 characters")
    .max(30, "Vehicle identification number should not exceed 30 characters"),
  engineNumber: yup
    .string()
    .required("Engine number is required")
    .matches(/^[a-zA-Z0-9]+$/, {
      message: "Engine number should contain alphabets & numbers",
      excludeEmptyString: true,
    })
    .min(3, "Engine number should be at least 3 characters")
    .max(30, "Engine number should not exceed 30 characters"),
  vehicleBodyType: yup
    .string()
    .notOneOf(["0"], "Vehicle body type is required")
    .required("Vehicle body type is required"),
  manufacturedYear: yup
    .string()
    .notOneOf(["0"], "Manufactured year is required")
    .required("Manufactured year is required"),
  transmission: yup
    .string()
    .notOneOf(["0"], "Transmission is required")
    .required("Transmission is required"),
  odometerReading: yup
    .string()
    .required("Odometer reading is required")
    .matches(/^[0-9]+$/, {
      message: "Odometer reading should contain only numbers",
      excludeEmptyString: true,
    })
    .min(3, "Odometer reading should be at least 3 characters")
    .max(30, "Odometer reading should not exceed 30 characters"),
  regExpiry: yup
    .string()
    .required("Reg expiry is required")
    .test("future-date", "Reg expiry only future date", function (value) {
      if (!value) return true; // If number date selected, it's valid
      const selectedDate = new Date(value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      return selectedDate >= currentDate; // Check if the selected date is in the future
    }),
  licensePlate: yup
    .string()
    .required("License plate is required")
    .matches(/^[a-zA-Z0-9]+$/, {
      message: "License plate should contain alphabets & numbers",
      excludeEmptyString: true,
    })
    .min(3, "License plate should be at least 3 characters")
    .max(30, "License plate should not exceed 30 characters"),
  radioButtonsGroup: yup.string().required("Select the radio button"),
  textArea: yup.string().test({
    name: "conditionalTextArea",
    test: function (value) {
      const isOption2Selected =
        this.parent.radioButtonsGroup === "Does not reflect the actual mileage";
      if (isOption2Selected && !value) {
        return this.createError({
          path: "textArea",
          message:
            "Explanation is required when actual mileage does not reflect",
        });
      }
      return true;
    },
  }),
  isAgree: yup.boolean().oneOf([true], "Please select the checkbox"),
});

export default validationSchema;
