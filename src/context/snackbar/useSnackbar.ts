import { useState } from 'react';

export const useSnackbar = () => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');

    const SnackbarHandler = (isOpen?: boolean) => {
        if (typeof isOpen === 'boolean') {
            return setIsSnackbarOpen(isOpen);
        }
        setIsSnackbarOpen(prev => !prev);
    };

    const OpenSnackbar = (message: string) => {
        if (typeof message !== 'string') {
            console.error('Type of message is not string');
        }
        setMessage(message);
        setIsSnackbarOpen(true);
    };

    return {
        state: {
            isSnackbarOpen,
            message
        },
        actions: {
            SnackbarHandler,
            OpenSnackbar
        }
    };
};