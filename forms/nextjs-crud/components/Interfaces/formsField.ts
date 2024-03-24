import { FieldError } from "react-hook-form";

export interface IRenderFields {
  label: string;
  rows?: number | undefined;
  error?: FieldError | undefined;
  type?: string;
  id?: string;
  fieldName: string;
  defaultValue?: string | number | boolean | Date | string[] | undefined; // Update this line
  options?: { value: string | number; menuItem: string; disabled?: boolean }[];
  required?: boolean;
  menuItem?: string;
}
