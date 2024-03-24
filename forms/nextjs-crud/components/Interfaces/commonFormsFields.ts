import { FieldError } from "react-hook-form";

export interface IRenderFields extends DataField {
  error?: FieldError | undefined;
}

export interface ICommonFieldForm {
  title: string;
  fields: IRenderFields[];
}

export interface DataField {
  label: string;
  type: "text" | "select" | "date" | "checkbox" | "radio" | "textArea";
  id?: string;
  rows?: number;
  fieldName: string;
  required?: boolean;
  defaultValue?: string | number | boolean | string[] | Date;
  options?: OptionData[] | string[];
}

export interface OptionData {
  value: string | number;
  menuItem: string;
  disabled?: boolean;
}
