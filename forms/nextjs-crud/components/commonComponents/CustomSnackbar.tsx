import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ICustomSnackbarProps } from "../Interfaces/customSnackbar";

const CustomSnackbar: React.FC<ICustomSnackbarProps> = ({
  open,
  alertMessage,
  severity,
}) => {
  return (
    
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity} // Use the severity from the state
      >
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
