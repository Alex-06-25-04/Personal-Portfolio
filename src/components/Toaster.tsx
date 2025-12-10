import { Toaster as HotToaster } from 'react-hot-toast';

export default function Toaster() {
    return (
        <HotToaster
            position="top-center"
            reverseOrder={false}
            containerStyle={{
                top: '50%',
                transform: 'translateY(-50%)',
            }}
            toastOptions={{
                style: {
                    background: 'rgba(31, 41, 55, 0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '16px',
                    color: '#ffffff',
                    padding: '16px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    maxWidth: '400px',
                    minWidth: '300px',
                },
                duration: 4000,
                success: {
                    style: {
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
                        border: '1px solid rgba(6, 181, 212, 0.42)',
                    },
                    iconTheme: {
                        primary: '#06b6d4',
                        secondary: '#ffffff',
                    },
                },
                error: {
                    style: {
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                    },
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#ffffff',
                    },
                },
            }}
        />
    )
}
