import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export const Notification = ({ visible, message, type, onClose }) => {
  return (
    <Snackbar
      open={visible}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => onClose()}
      bodyStyle={{ maxWidth: "100%", minHeight: "50px" }}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
};
