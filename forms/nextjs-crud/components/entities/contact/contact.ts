import { ICommonFieldForm } from "../../Interfaces/commonFormsFields";
export const contactSchemaTypes: ICommonFieldForm = {
  title: "Contact",
  fields: [
    {
      fieldName: "firstName",
      required: true,
      label: "First Name",
      type: "text",
      id: "firstName",
    },
    {
      fieldName: "lastName",
      required: true,
      label: "Last Name",
      type: "text",
      id: "lastName",
    },
    {
      fieldName: "email",
      required: true,
      label: "Email",
      type: "text",
      id: "email",
    },
    {
      fieldName: "country",
      required: true,
      label: "Country",
      type: "select",
      defaultValue: 0,
      options: [
        {
          value: 0,
          menuItem: "Select your Country",
          disabled: true,
        },
        { value: "pakistan", menuItem: "Pakistan" },
        { value: "india", menuItem: "India" },
        { value: "australia", menuItem: "Australia" },
        { value: "US", menuItem: "US" },
        { value: "UAE", menuItem: "UAE" },
      ],
    },
    {
      fieldName: "account",
      required: true,
      label: "Account",
      type: "text",
      id: "account",
    },
    {
      fieldName: "company",
      required: true,
      label: "Company",
      type: "text",
      id: "company",
    },
    {
      fieldName: "contactNo",
      required: true,
      label: "Contact",
      type: "text",
      id: "contactNo",
    },
    {
      fieldName: "status",
      label: "Status",
      type: "radio",
      defaultValue: "",
      options: [
        {
          menuItem: "Enable",
          value: "enable",
        },
        {
          menuItem: "Disabled",
          value: "disabled",
        },
      ],
    },
    {
      fieldName: "subject",
      label: "Subject:",
      defaultValue: "",
      type: "textArea",
    },
    {
      fieldName: "userType",
      label: "User Type",
      type: "radio",
      defaultValue: "",
      options: [
        {
          menuItem: "Feedback",
          value: "feedback",
        },
        {
          menuItem: "Support",
          value: "support",
        },
        {
          menuItem: "Inquiry",
          value: "inquiry",
        },
      ],
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
