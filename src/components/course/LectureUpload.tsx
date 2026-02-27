import React, { useState } from 'react';
import courseService from '../../services/courseService';
import { FileUpload } from './FileUpload';

interface LectureUploadProps {
    courseId: string;
    lectureNumber: number;
    onSuccess: () => void;
    onCancel: () => void;
}

export const LectureUpload: React.FC<LectureUploadProps> = ({
    courseId,
    lectureNumber,
    onSuccess,
    onCancel
}) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [materialFiles, setMaterialFiles] = useState<Array<{ file: File; title: string; isDownloadable: boolean }>>([]);
    const [videoIsFree, setVideoIsFree] = useState(false);
    const [materialTitle, setMaterialTitle] = useState('');
    const [materialIsDownloadable, setMaterialIsDownloadable] = useState(true);
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleVideoUpload = async () => {
        if (!videoFile) {
            setError('Please select a video file');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            const response = await courseService.uploadLectureVideo(
                courseId,
                lectureNumber,
                videoFile,
                videoIsFree,
                (progress) => {
                    setUploadProgress(prev => ({ ...prev, video: progress }));
                }
            );

            if (response.success) {
                setSuccess('Video uploaded successfully!');
                setVideoFile(null);
                setUploadProgress(prev => ({ ...prev, video: 100 }));
            } else {
                setError(response.message);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to upload video');
        } finally {
            setIsUploading(false);
        }
    };

    const handleMaterialAdd = (file: File) => {
        // Use filename as default title if no title is provided
        const title = materialTitle.trim() || file.name.replace(/\.[^/.]+$/, ''); // Remove file extension
        
        setMaterialFiles(prev => [
            ...prev,
            { file, title, isDownloadable: materialIsDownloadable }
        ]);
        setMaterialTitle('');
        setError('');
    };

    const handleMaterialRemove = (index: number) => {
        setMaterialFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleMaterialsUpload = async () => {
        if (materialFiles.length === 0) {
            setError('Please add at least one material');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            for (let i = 0; i < materialFiles.length; i++) {
                const material = materialFiles[i];
                const response = await courseService.uploadLectureMaterial(
                    courseId,
                    lectureNumber,
                    material.file,
                    {
                        title: material.title,
                        isFree: false,
                        isDownloadable: material.isDownloadable
                    },
                    (progress) => {
                        setUploadProgress(prev => ({ ...prev, [`material_${i}`]: progress }));
                    }
                );

                if (!response.success) {
                    setError(`Failed to upload ${material.title}: ${response.message}`);
                    return;
                }
            }

            setSuccess('All materials uploaded successfully!');
            setMaterialFiles([]);
            setUploadProgress({});
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to upload materials');
        } finally {
            setIsUploading(false);
        }
    };

    const handleFinish = () => {
        onSuccess();
    };

    return (
        <div className="bg-white rounded-lg shadow-2xl p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                    Upload Content - Lecture {lectureNumber}
                </h2>
                <button
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}

            {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-800 text-sm">{success}</p>
                </div>
            )}

            {/* Video Upload Section */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    Lecture Video
                </h3>

                <FileUpload
                    accept=".mp4,.mov,.mkv,.webm,.avi"
                    maxSize={500}
                    onFileSelect={setVideoFile}
                    label="Upload Video"
                    description="Supported: MP4, MOV, MKV, WEBM, AVI (Max 500MB)"
                />

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="videoIsFree"
                        checked={videoIsFree}
                        onChange={(e) => setVideoIsFree(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="videoIsFree" className="ml-2 text-sm text-gray-700">
                        Make this video free (preview)
                    </label>
                </div>

                {uploadProgress.video !== undefined && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Uploading video...</span>
                            <span className="text-gray-900 font-medium">{uploadProgress.video}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress.video}%` }}
                            />
                        </div>
                    </div>
                )}

                <button
                    onClick={handleVideoUpload}
                    disabled={!videoFile || isUploading}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isUploading ? 'Uploading...' : 'Upload Video'}
                </button>
            </div>

            {/* Materials Upload Section */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    Lecture Materials
                </h3>

                <div className="space-y-3">
                    <input
                        type="text"
                        value={materialTitle}
                        onChange={(e) => setMaterialTitle(e.target.value)}
                        placeholder="Material title (Optional - defaults to filename)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="materialDownloadable"
                            checked={materialIsDownloadable}
                            onChange={(e) => setMaterialIsDownloadable(e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="materialDownloadable" className="ml-2 text-sm text-gray-700">
                            Allow students to download this file
                        </label>
                    </div>

                    <FileUpload
                        accept=".pdf,.docx,.pptx,.xlsx,.txt,.zip,.rar,.mp3,.wav,.jpg,.png"
                        maxSize={100}
                        onFileSelect={handleMaterialAdd}
                        label="Add Material"
                        description="Supported: PDF, DOCX, PPTX, XLSX, TXT, ZIP, RAR, Audio, Images (Max 100MB)"
                    />
                </div>

                {materialFiles.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Materials to upload:</h4>
                        {materialFiles.map((material, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{material.title}</p>
                                        <p className="text-xs text-gray-500">
                                            {material.file.name} • {material.isDownloadable ? 'Downloadable' : 'View only'}
                                        </p>
                                    </div>
                                </div>
                                {uploadProgress[`material_${index}`] !== undefined ? (
                                    <span className="text-sm text-blue-600 font-medium">
                                        {uploadProgress[`material_${index}`]}%
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => handleMaterialRemove(index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={handleMaterialsUpload}
                            disabled={isUploading}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isUploading ? 'Uploading...' : `Upload ${materialFiles.length} Material(s)`}
                        </button>
                    </div>
                )}
            </div>

            {/* Finish Button */}
            <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleFinish}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Finish & Close
                </button>
            </div>
        </div>
    );
};

