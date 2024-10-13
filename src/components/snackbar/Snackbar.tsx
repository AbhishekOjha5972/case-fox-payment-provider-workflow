// CustomSnackbar.tsx
import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AUTO_HIDE_DURATION } from '../../constants';

interface CustomSnackbarProps {
    open: boolean;
    message: string;
    severity?: 'error' | 'warning' | 'info' | 'success'; // Customize the severity types as needed
    onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
    open,
    message,
    severity = 'success',
    onClose,
}) => {


    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open} autoHideDuration={AUTO_HIDE_DURATION} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
