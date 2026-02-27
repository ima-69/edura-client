import React from 'react';
import { LectureUpload } from './LectureUpload';

interface UploadContentModalProps {
    isOpen: boolean;
    courseId: string;
    lectureNumber: number;
    onClose: () => void;
    onSuccess: () => void;
}

export const UploadContentModal: React.FC<UploadContentModalProps> = ({
    isOpen,
    courseId,
    lectureNumber,
    onClose,
    onSuccess
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-start justify-center z-50 p-4 overflow-y-auto">
            <div className="w-full max-w-4xl my-4">
                <LectureUpload
                    courseId={courseId}
                    lectureNumber={lectureNumber}
                    onSuccess={onSuccess}
                    onCancel={onClose}
                />
            </div>
        </div>
    );
};

