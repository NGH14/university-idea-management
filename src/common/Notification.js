import {Alert, Snackbar} from "@mui/material";
import {useState} from "react";

export const Notification = ({visible, message, type, onClose}) => {
        return <Snackbar
            open={visible}
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            onClose={()=>onClose()}
        >
            <Alert
                severity={type}
            >
                {message}
            </Alert>
        </Snackbar>
}