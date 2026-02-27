import React from 'react';

interface NotificationProps {
    show: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
    onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ show, type, title, message, onClose }) => {
    if (!show) return null;

    const bgColor = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        info: 'bg-blue-50 border-blue-200'
    };

    const iconColor = {
        success: 'bg-green-100 text-green-600',
        error: 'bg-red-100 text-red-600',
        info: 'bg-blue-100 text-blue-600'
    };

    const icon = {
        success: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        info: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    };

    return (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-start justify-center z-50 p-4 pt-20">
            <div className={`w-full max-w-md border-2 rounded-lg shadow-2xl p-4 ${bgColor[type]} animate-slide-down`}>
                <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconColor[type]}`}>
                        {icon[type]}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                        <p className="text-sm text-gray-700">{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

