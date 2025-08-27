import type { SnackbarOrigin } from "@mui/material";

import React from "react";

import { Alert, Snackbar, AlertTitle } from "@mui/material";

interface AlertProps {
  open: boolean;
  severity?: "error" | "warning" | "info" | "success";
  message: string;
  title?: string;
  autoHideDuration?: number; 
  onClose: () => void;
  anchorOrigin?: SnackbarOrigin; 
}

const AlertComponent: React.FC<AlertProps> = ({
  open,
  severity = "info",
  message,
  title,
  autoHideDuration = 3000,
  onClose,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
}) => (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );

export default AlertComponent;
