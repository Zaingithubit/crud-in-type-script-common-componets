import { ICommonFieldForm } from "../../Interfaces/commonFormsFields";
export const vehicleSchemaTypes: ICommonFieldForm = {
  title: "Vehicle ",
  fields: [
    {
      label: "Make",
      type: "text",
      id: "Make",
      fieldName: "make",
      required: true,
    },
    {
      label: "Model",
      type: "text",
      id: "Model",
      fieldName: "model",
      required: true,
    },
    {
      label: "Vehicle Identification No",
      type: "text",
      id: "vehicle-identification-number",
      fieldName: "vehicleIdentificationNumber",
      required: true,
    },
    {
      label: "Engine Number",
      type: "text",
      id: "engine-number",
      fieldName: "engineNumber",
      required: true,
    },
    {
      fieldName: "vehicleBodyType",
      required: true, //top
      label: "Vehicle Body Type",
      type: "select",
      defaultValue: 0,
      options: [
        {
          value: 0,
          menuItem: "Select the vehicle body type",
          disabled: true,
        },
        { value: "Van/Minivan", menuItem: "Van/Minivan" },
        { value: "Wagon", menuItem: "Wagon" },
        { value: "Hybrid Vehicle", menuItem: "Hybrid Vehicle" },
        { value: "Sedan", menuItem: "Sedan" },
      ],
    },
    {
      fieldName: "manufacturedYear",
      label: "Manufactured Year",
      required: true,
      type: "select",
      defaultValue: 0,
      options: [
        {
          value: 0,
          menuItem: "Select the manufactured year",
          disabled: true,
        },
        { value: "1997", menuItem: "1997" },
        { value: "1998", menuItem: "1998" },
        { value: "2000", menuItem: "2000" },
        { value: "2005", menuItem: "2005" },
      ],

      id: "manufactured-year-label",
    },
    {
      fieldName: "transmission",
      label: "Transmission",
      required: true,
      type: "select",
      defaultValue: 0,
      options: [
        { menuItem: "Select the transmission", value: 0, disabled: true },
        { value: "Automatic", menuItem: "Automatic" },
        { value: "Manual", menuItem: "Manual" },
      ],
    },
    {
      fieldName: "odometerReading",
      label: "Odometer Reading",
      type: "text",
      id: "odometer-reading",
      required: true,
    },
    {
      fieldName: "regExpiry",
      label: "Reg Expiry",
      type: "date",
      id: "reg-expiry",
      required: true,
    },
    {
      fieldName: "licensePlate",
      required: true,
      label: "License Plate",
      type: "text",
      id: "license-plate",
    },
    {
      label: "Type of vehicles:",
      required: true,
      type: "checkbox",
      defaultValue: [],
      options: ["4 Wheeler", "3 Wheeler", "2 Wheeler"],
      fieldName: "wheeler",
    },
    {
      label: "Odometer Reading",
      fieldName: "radioButtonsGroup",
      required: true,
      type: "radio",
      defaultValue: "",
      options: [
        {
          menuItem: "Reflects the actual mileage",
          value: "Reflects the actual mileage",
        },
        {
          menuItem: "Does not reflect the actual mileage",
          value: "Does not reflect the actual mileage",
        },
      ],
    },
    {
      fieldName: "textArea",
      label: "If it does not reflect the actual mileage, please explain here:",
      defaultValue: "",
      type: "textArea",
    },
    {
      fieldName: "isAgree",
      required: true,
      label: "I agree to the terms & conditions",
      defaultValue: false,
      type: "checkbox",
    },
  ],
};
