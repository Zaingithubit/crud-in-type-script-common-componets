// customSnackbar.ts
import { AlertColor } from "@mui/material";

export interface ICustomSnackbarProps {
  open: boolean;
  alertMessage: string;
  severity: AlertColor;
}

export interface ICustomSnackbar {
  open: boolean;
  alertMessage: string;
  severity: "success" | "error"; // Update severity values
}
