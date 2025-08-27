import type {
  DialogProps} from "@mui/material";

import React from "react";

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

interface DialogComponentProps {
  open: boolean; 
  title?: string; 
  message?: string; 
  confirmText?: string; 
  cancelText?: string; 
  onConfirm: () => void; 
  onCancel: () => void; 
  fullWidth?: boolean;
  maxWidth?: DialogProps["maxWidth"]; 
}

const DialogComponent: React.FC<DialogComponentProps> = ({
  open,
  title = "Confirmation", 
  message = "Are you sure you want to proceed?", 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  fullWidth = true,
  maxWidth = "sm",
}) => (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="outlined" color="error">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="success" variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );

export default DialogComponent;
