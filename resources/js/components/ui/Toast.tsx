import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Auto close after 5 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-20 right-4 z-[9999] animate-slide-in">
            <div className={`rounded-lg shadow-lg p-4 min-w-[300px] ${
                type === 'success' 
                    ? 'bg-green-900/90 text-green-100 border border-green-800/50' 
                    : 'bg-red-900/90 text-red-100 border border-red-800/50'
            } backdrop-blur-sm`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {type === 'success' ? (
                            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        )}
                        <p className="text-sm font-medium">{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 text-gray-400 hover:text-gray-300 focus:outline-none"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
} 